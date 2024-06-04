import axios from "axios";

export class getDataFromServer {
  static serverUrl = "http://localhost:9000";

  static wholeGroups() {
    let Groups = `${this.serverUrl}/groups`;
    return axios.get(Groups);
  }

  static groupsId(contacts) {
    let groupIdAll = contacts.groupId;
    let dataUrl = `${this.serverUrl}/groups/${groupIdAll}`;
    return axios.get(dataUrl);
  }

  static getApiData() {
    let dataUrl = `${this.serverUrl}/contacts`;
    console.log("dataUrl", dataUrl);
    return axios.get(dataUrl);
  }

  static getDataById(contactId) {
    let DataId = `${this.serverUrl}/contacts/${contactId}`;
    console.log("DataId", DataId);
    return axios.get(DataId);
  }

  static createContact(contacts) {
    let dataUrl = `${this.serverUrl}/contacts`;
    return axios.post(dataUrl, contacts);
  }

  static getEditById( contacts ,  contactId) {
    let DataId = `${this.serverUrl}/contacts/${contactId}`;
    console.log("DataId", DataId);
    return axios.put(DataId , contacts);
  }

  static getDeleteById (contactId){
    let datadelete = `${this.serverUrl}/contacts/${contactId}`;
    return axios.delete(datadelete)
  }
}
