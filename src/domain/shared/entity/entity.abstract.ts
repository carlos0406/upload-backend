import { Notification } from './../notification/notification'
export class AbstractClassEntity {
  public notification: Notification
  constructor () {
    this.notification = new Notification()
  }
}
