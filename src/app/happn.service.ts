import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CurrentUserService} from './currentUser.service';

interface Wrapped<T> {
  data: T;
}

export interface User {
  id: string;
  first_name: string;
  // full
  fb_id: string;
  age: number;
  profiles: Array<{
    url: string;
  }>;
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
