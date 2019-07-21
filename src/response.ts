/**
 * class represents the response of a service action which typically results in a boolean type response
 */
export class Response {

  public static ACTION_OK = 'action_ok';
  public static ACTION_FAIL = 'action_fail';

 /*
  * the date time of the action
  */
  public dateTime: Date | undefined;

 /*
  * a string representing the technical name of the action
  */
  public actionName: string | undefined;

 /*
  * The result of the action: ACTION_OK | ACTION_FAIL
  */
  public status: string | undefined;

 /*
  * a specific error code generated by the service
  */
  public errorCode: string | undefined;

 /*
  * a technical error message
  */
  public errorMessage: string | undefined;

  /*
   * the entity created or updated
   */
  public data: any;

}
