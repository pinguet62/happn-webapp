import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CurrentUserService} from './login/currentUser.service';

interface Wrapped<T> {
  data: T;
}

interface Profile {
  url: string;
}

export interface NearYouNotification {
  id: string;
  notifier: {
    my_relation: 0 | 1 | 4; // 0 = new relation, 1 = accepted by me but not (yet) by target, 4 = matched
    is_accepted: boolean; // if target user accepted my profile
    first_name: string;
    profiles: Profile[];
  };
}

export interface User {
  id: string;
  first_name: string;
  // full
  fb_id: string;
  age: number;
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
      HappnService.URL + '/api/users/me/notifications?types=468&fields=id,is_pushed,lon,actions,creation_date,is_notified,lat,modification_date,notification_type,nb_times,notifier.fields(id,job,is_accepted,workplace,my_relation,distance,gender,my_conversation,is_charmed,nb_photos,last_name,first_name,age,profiles),notified.fields(is_accepted,is_charmed)',
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

  getMessages(conversationId: string): Observable<Message[]> {
    return this.http.get<Wrapped<Message[]>>(
      // login
      HappnService.URL + `/api/conversations/${conversationId}/messages?fields=id,message,creation_date,sender.fields(id,profiles)`,
      {headers: {Authorization: `OAuth="${this.currentUser.accessToken}"`}})
      .pipe(map(res => res.data));
  }

  sendMessage(conversation: Conversation, text: string): Observable<any> {
    throw Error('Not yet implemented');
  }

}
