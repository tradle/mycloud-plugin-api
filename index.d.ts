export interface Stub {
  type: string
  firstName?: string
  lastName?: string
  dateOfBirth?: string
  companyName?: Prop
  registrationDate?: Prop
  link: string
}
export interface ITradleObject extends Stub {
  url?: string
  rfidFace?: ITradleObject
  scan?: ITradleObject
  selfie?: ITradleObject
  rawData?: any
  hits?: any
  status?: string
}
export interface Prop {
  ref: string
  readOnly: boolean
}
export interface ModelEnum {
  id: string
  integrationId: string
}
export interface Model {
  enum: ModelEnum[]
  properties: {
    [key: string]: Prop
  }
}
export interface Bot {
  models: {
    [name: string]: Model
  }
  resolveEmbeds (obj: ITradleObject): Promise<void>
  draft({ type: VERIFICATION }): ITradleObject
  getResource(stub: Stub): Promise<ITradleObject>
}
export interface Logger {
  debug(...args): void
  error(...args): void
}
export interface CreatePlugin <T> {}
export interface Applications {
  createCheck(checkR: ITradleObject, req: IPBReq): Promise<ITradleObject>
  createVerification(opts: { application: IPBApp, verification, org }): Promise<void>
  deactivateChecks(opts: {
    application: IPBApp
    type: string
    form: ITradleObject
    req: IPBReq
  }): Promise<void>
}
export interface Submission {
  submission: string
}
export interface IPBApp {
  applicantName: string
  requestFor: string
  submissions?: Submission[]
  checks: Check[]
  adverseMediaHit: boolean
  sanctionsHit: boolean
  pepHit: boolean
}
export interface FormRequest {
  form: string
  prefill?: {}
}
export interface IPluginLifecycleMethods {
  onFormsCollected?: (opts: { req: IPBReq }) => Promise<void>
  validateForm?: (opts: { req: IPBReq }) => Promise<undefined | {
    message: string
    exit: boolean
  }>
  onmessage?: (req: IPBReq) => Promise<void>
  willRequestForm?: (opts: { user: ITradleObject, application: IPBApp, formRequest: FormRequest }) => void
}
export interface IPBReq {
  skipChecks: boolean
  user: ITradleObject
  application: IPBApp
  payload: ITradleObject
  checks: Check[]
}
export interface ITradleObject {
  set(obj: {}): this
  toJSON(): any
}
export interface IConfComponents {}
export interface ValidatePluginConf {}
export namespace Errors {
  class InvalidInput extends Error {
    constructor (message: string)
  }
}
export interface Res {
}
export interface Check {
  provider: string
}
export interface CheckNeedsToBeCreated {
  notMatched: {}
}
export namespace utils {
  function getStatusMessageForCheck(opts: { models: { [name: string]: Model }, check: Check }): string
  function ensureThirdPartyServiceConfigured(conf: any, name: string): void
  function getThirdPartyServiceInfo(conf: any, name: string): {}
  function post(url: string, data: any, opts: any): Promise<Res>

  function getLatestForms (app: IPBApp): Stub[]
  function getParsedFormStubs(app: IPBApp): Stub[]
  function doesCheckNeedToBeCreated (opts: {
    bot: Bot
    type: string
    application: IPBApp
    provider: string
    form: ITradleObject
    propertiesToCheck: string[]
    prop: string
    req: IPBReq
  }): Promise<null | CheckNeedsToBeCreated>
  function getChecks (opts: {
    bot: Bot
    type: string
    application: IPBApp
    provider: string
  }): Promise<Check[]>
  function hasPropertiesChanged (opts: {
    resource: ITradleObject
    bot: Bot
    propertiesToCheck: string[]
    req: IPBReq
  }): Promise<boolean>

  function getLatestCheck (opts: {
    type: string
    req: IPBReq
    application: IPBApp
    bot: Bot
  }): Promise<any>
  function isSubClassOf (type, value, obj): boolean
  function isPassedCheck (check: any): boolean
  function getCheckParameters (opts: {
    plugin: string
    resource: ITradleObject
    bot: Bot
    defaultPropMap: any
    map: any
  }): Promise<{
    resource: ITradleObject
    error?: Error
  }>
}

