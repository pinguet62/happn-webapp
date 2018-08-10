import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CurrentUserService} from './login/currentUser.service';

interface Wrapped<T> {
  data: T;
}

export interface Profile {
  url: string;
}

export interface NearYouNotification {
  id: string;
  notifier: User;
}

export enum Relation {
  NEW_RELATION = 0, // new relation
  ACCEPTED = 1, // accepted by me but not (yet) by target
  MATCHED = 4 // matched
}

export interface User {
  id: string;
  first_name: string;
  // full
  about: string | '';
  job: string | '' | null;
  is_accepted: boolean; // if target user accepted my profile
  workplace: string | '' | null;
  school: string | '';
  age: number;
  modification_date: string; // ISO 8601
  last_meet_position: {
    lat: number;
    lon: number;
  } | null;
  my_relation: Relation;
  profiles: Profile[];
}

export interface Conversation {
  id: string; // "${me}_${target}" - ex: "15860808_19624673930"
  participants: Array<{
    id: string; // "${me}_${target}_${me}" - ex: "15860808_19624673930_15860808"
    user: User;
  }>;
  messages: Message[];
}

export interface Message {
  id: string;
  message: string;
  creation_date: string;
  sender: User;
}

export interface Accepted {
  has_crushed: boolean;
}

export type Rejected = void;

export interface Device {
  id: string;
  position: {
    latitude: number;
    longitude: number;
    alt: number;
  };
}

@Injectable()
export class HappnService {

  private static readonly URL = 'https://api.happn.fr';

  constructor(
    private http: HttpClient,
    private currentUser: CurrentUserService,
  ) {
  }

  getTimeline(): Observable<NearYouNotification[]> {
    return this.http.get<Wrapped<NearYouNotification[]>>(
      HappnService.URL + '/api/users/me/notifications?limit=99999&types=468&fields=id,is_pushed,lon,actions,creation_date,is_notified,lat,modification_date,notification_type,nb_times,notifier.fields(id,job,is_accepted,workplace,my_relation,distance,gender,my_conversation,is_charmed,nb_photos,last_name,first_name,age,profiles),notified.fields(is_accepted,is_charmed)',
      {headers: {Authorization: `OAuth="${this.currentUser.accessToken}"`}})
      .pipe(map(res => res.data));
  }

  acceptProfile(userId: string): Observable<Accepted> {
    return this.http.post<Wrapped<Accepted>>(
      HappnService.URL + `/api/users/me/accepted/${userId}`,
      null,
      {headers: {Authorization: `OAuth="${this.currentUser.accessToken}"`}})
      .pipe(map(res => res.data));
  }

  rejectProfile(userId: string): Observable<Rejected> {
    return this.http.post<Wrapped<Rejected>>(
      HappnService.URL + `/api/users/me/rejected/${userId}`,
      null,
      {headers: {Authorization: `OAuth="${this.currentUser.accessToken}"`}})
      .pipe(map(res => res.data));
  }

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Wrapped<Conversation[]>>(
      HappnService.URL + '/api/users/me/conversations?limit=99999&fields=participants.fields(user.fields(first_name,profiles)),messages.fields(message)',
      {headers: {Authorization: `OAuth="${this.currentUser.accessToken}"`}})
      .pipe(map(res => res.data));
  }

  getProfile(userId: string): Observable<User> {
    return this.http.get<Wrapped<User>>(
      // login
      HappnService.URL + `/api/users/${userId}?fields=birth_date,first_name,fb_id,last_name,display_name,credits,referal,matching_preferences,notification_settings,unread_conversations,about,is_accepted,age,job,workplace,school,modification_date,profiles.mode(0).width(1000).height(1000).fields(url,width,height,mode),last_meet_position,my_relation,is_charmed,distance,gender`,
      {headers: {Authorization: `OAuth="${this.currentUser.accessToken}"`}})
      .pipe(map(res => res.data));
  }

  getDevices(): Observable<Device[]> {
    return this.http.get<Wrapped<Device[] | null>>(
      // login
      HappnService.URL + `/api/users/me/devices`,
      {headers: {Authorization: `OAuth="${this.currentUser.accessToken}"`}})
      .pipe(map(res => res.data));
  }

  setPosition(deviceId: string, position: { latitude: number, longitude: number }): Observable<Device> {
    return this.http.put<Wrapped<Device>>(
      // login
      HappnService.URL + `/api/users/${this.currentUser.userId}/devices/${deviceId}`,
      {latitude: position.latitude, longitude: position.longitude, alt: 20}, // TODO check "alt"
      {headers: {Authorization: `OAuth="${this.currentUser.accessToken}"`}})
      .pipe(map(res => res.data));
  }

  getMessages(conversationId: string): Observable<Message[]> {
    return this.http.get<Wrapped<Message[]>>(
      // login
      HappnService.URL + `/api/conversations/${conversationId}/messages?limit=99999&fields=id,message,creation_date,sender.fields(id,profiles)`,
      {headers: {Authorization: `OAuth="${this.currentUser.accessToken}"`}})
      .pipe(map(res => res.data));
  }

  sendMessage(conversation: Conversation, message: string): Observable<Message> {
    return this.http.post<Wrapped<Message>>(
      HappnService.URL + `/api/conversations/${conversation.id}/messages&fields=id,message,creation_date,sender.fields(id,profiles)`,
      {message},
      {headers: {Authorization: `OAuth="${this.currentUser.accessToken}"`}})
      .pipe(map(res => res.data));
  }

}
