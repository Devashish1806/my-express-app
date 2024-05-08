import {
  Activity,
  ActivityEventNames,
  ActivityTypes,
  Attachment,
  AttachmentLayoutTypes,
  ChannelAccount,
  ConversationAccount,
  ConversationReference,
  EndOfConversationCodes,
  Entity,
  InputHints,
  SuggestedActions,
  TextFormatTypes,
  TranscriptLogger,
} from "botbuilder";
import { ChatTranscriptDao } from "../../admin/chat-transcript/chat-transcript.dao";

export class PlatfromTranscriptLogger implements TranscriptLogger {
  logActivity(activity: Activity): void | Promise<void> {
    const log = this.logObject(activity);
    ChatTranscriptDao.getInstance().addLog(log);
  }

  private logObject(activity: Activity): TranscriptSchema {
    const transcriptObj: TranscriptSchema = {
      type: activity.type,
      id: activity.id,
      timestamp: activity.timestamp,
      localTimestamp: activity.localTimestamp,
      localTimezone: activity.localTimezone,
      callerId: activity.callerId,
      serviceUrl: activity.serviceUrl,
      channelId: activity.channelId,
      from: activity.from,
      conversation: activity.conversation,
      recipient: activity.recipient,
      textFormat: activity.textFormat,
      attachmentLayout: activity.attachmentLayout,
      topicName: activity.topicName,
      locale: activity.locale,
      text: activity.text,
      inputHint: activity.inputHint,
      summary: activity.summary,
      suggestedActions: activity.suggestedActions,
      attachments: activity.attachments,
      entities: activity.entities,
      channelData: activity.channelData, // eslint-disable-line @typescript-eslint/no-explicit-any
      action: activity.action,
      replyToId: activity.replyToId,
      label: activity.label,
      valueType: activity.valueType,
      value: activity.value, // eslint-disable-line @typescript-eslint/no-explicit-any
      name: activity.name,
      relatesTo: activity.relatesTo,
      code: activity.code,
      expiration: activity.expiration,
    };
    return transcriptObj;
  }
}

interface TranscriptSchema {
  /**
   * Contains the activity type. Possible values include: 'message', 'contactRelationUpdate',
   * 'conversationUpdate', 'typing', 'endOfConversation', 'event', 'invoke', 'deleteUserData',
   * 'messageUpdate', 'messageDelete', 'installationUpdate', 'messageReaction', 'suggestion',
   * 'trace', 'handoff'
   */
  type: ActivityTypes | string;
  /**
   * Contains an ID that uniquely identifies the activity on the channel.
   */
  id?: string;
  /**
   * Contains the date and time that the message was sent, in UTC, expressed in ISO-8601 format.
   */
  timestamp?: Date;
  /**
   * Contains the local date and time of the message, expressed in ISO-8601 format.
   * For example, 2016-09-23T13:07:49.4714686-07:00.
   */
  localTimestamp?: Date;
  /**
   * Contains the name of the local timezone of the message, expressed in IANA Time Zone database format.
   * For example, America/Los_Angeles.
   */
  localTimezone: string;
  /**
   * A string containing a URI identifying the caller of a bot. This field is not intended to be transmitted over
   * the wire, but is instead populated by bots and clients based on cryptographically verifiable data that asserts
   * the identity of the callers (e.g. tokens).
   */
  callerId: string;
  /**
   * Contains the URL that specifies the channel's service endpoint. Set by the channel.
   */
  serviceUrl: string;
  /**
   * Contains an ID that uniquely identifies the channel. Set by the channel.
   */
  channelId: string;
  /**
   * Identifies the sender of the message.
   */
  from: ChannelAccount;
  /**
   * Identifies the conversation to which the activity belongs.
   */
  conversation: ConversationAccount;
  /**
   * Identifies the recipient of the message.
   */
  recipient: ChannelAccount;
  /**
   * Format of text fields Default:markdown. Possible values include: 'markdown', 'plain', 'xml'
   */
  textFormat?: TextFormatTypes | string;
  /**
   * The layout hint for multiple attachments. Default: list. Possible values include: 'list',
   * 'carousel'
   */
  attachmentLayout?: AttachmentLayoutTypes | string;
  /**
   * The updated topic name of the conversation.
   */
  topicName?: string;
  /**
   * A locale name for the contents of the text field.
   * The locale name is a combination of an ISO 639 two- or three-letter culture code associated
   * with a language
   * and an ISO 3166 two-letter subculture code associated with a country or region.
   * The locale name can also correspond to a valid BCP-47 language tag.
   */
  locale?: string;
  /**
   * The text content of the message.
   */
  text: string;
  /**
   * Indicates whether your bot is accepting,
   * expecting, or ignoring user input after the message is delivered to the client. Possible
   * values include: 'acceptingInput', 'ignoringInput', 'expectingInput'
   */
  inputHint?: InputHints | string;
  /**
   * The text to display if the channel cannot render cards.
   */
  summary?: string;
  /**
   * The suggested actions for the activity.
   */
  suggestedActions?: SuggestedActions;
  /**
   * Attachments
   */
  attachments?: Attachment[];
  /**
   * Represents the entities that were mentioned in the message.
   */
  entities?: Entity[];
  /**
   * Contains channel-specific content.
   */
  channelData?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Indicates whether the recipient of a contactRelationUpdate was added or removed from the
   * sender's contact list.
   */
  action?: string;
  /**
   * Contains the ID of the message to which this message is a reply.
   */
  replyToId?: string;
  /**
   * A descriptive label for the activity.
   */
  label: string;
  /**
   * The type of the activity's value object.
   */
  valueType: string;
  /**
   * A value that is associated with the activity.
   */
  value?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * The name of the operation associated with an invoke or event activity.
   */
  name?: ActivityEventNames | string;
  /**
   * A reference to another conversation or activity.
   */
  relatesTo?: ConversationReference;
  /**
   * The a code for endOfConversation activities that indicates why the conversation ended.
   * Possible values include: 'unknown', 'completedSuccessfully', 'userCancelled', 'botTimedOut',
   * 'botIssuedInvalidMessage', 'channelFailed'
   */
  code?: EndOfConversationCodes | string;
  /**
   * The time at which the activity should be considered to be "expired" and should not be
   * presented to the recipient.
   */
  expiration?: Date;
}
