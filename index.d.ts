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
  [prop: string]: any
}
export interface Prop {
  ref: string
  type: string
  readOnly: boolean
}
export interface ModelEnum {
  id: string
  title: any
  integrationId: string
}
export interface Model {
  enum: ModelEnum[]
  properties: {
    [key: string]: Prop
  }
}
// TODO: this is a stub for the DB interface of @tradle/dynamodb
export interface DB {
  find: (opts: any) => Promise<any/* SearchResult */>
}
export interface Bot {
  models: {
    [name: string]: Model
  }
  resolveEmbeds (obj: ITradleObject): Promise<void>
  draft({ type: VERIFICATION }): ITradleObject
  getResource(stub: Stub): Promise<ITradleObject>
  db: DB
  buckets
}
export interface Logger {
  debug(...args): void
  error(...args): void
}
export interface IBotComponents {
  bot: Bot
  logger: Logger
  utils: Utils
  productsAPI: any
  employeeManager: any
  applications: Applications
  // TODO: Fill in the other parts
  friends: any // Friends
  alerts: any // Alerts
  conf?: IConfComponents
  remediation?: any // Remediation
  onfido?: any // Onfido
  deployment?: any // Deployment
  commands?: any // Commander
  emailBasedVerifier?: any // EmailBasedVerifier
  smsBasedVerifier?: any // SMSBasedVerifier
  documentChecker?: any // DocumentCheckerAPI
  tradleServicesStack?: any // TradleServicesStack
  [x: string]: any
}
export interface IPluginOpts {
  logger: Logger
  conf?: any
}
declare namespace PluginLifecycle {
  // synchronous, attach conditioned on handleMessages
  export type onmessage = (req:IPBReq) => boolean|void | Promise<boolean|void>
  export type willSend = (opts: any /* TODO: IWillSendArg */) => void | Promise<void>
  export type willRequestForm = (opts: any /* TODO: IWillRequestFormArg */) => void | Promise<void>
  export type willApproveApplication = (opts: any /* TODO: IWillJudgeAppArg */) => void | Promise<void>
  export type didApproveApplication = (opts: any /* TODO: IWillJudgeAppArg */, signedObject: ITradleObject) => void | Promise<void>
  export type willIssueCertificate = (opts: any /* TODO: WillIssueCertificateArg */) => void | Promise<void>
  export type willDenyApplication = (opts: any /* TODO: IWillJudgeAppArg */) => void | Promise<void>
  export type onFormsCollected = (opts: any /* TODO: IOnFormsCollectedArg */) => void | Promise<void>
  export type onPendingApplicationCollision = (opts: any /* TODO: IOnPendingApplicationCollisionArg */) => void | Promise<void>
  export type onRequestForExistingProduct = (req:IPBReq) => void | Promise<void>
  export type onCommand = ({ req: IPBReq, command: string }) => void | Promise<void>
  export type getRequiredForms = (opts:  any /* TODO: IGetRequiredFormsArg */) => Promise<void|string[]>
  export type validateForm = (opts:  any /* TODO: IValidateFormArg */) => Promise<void| any /* TODO: IValidateFormOutput */>

  export type replay = (obj: ITradleObject, applications: Applications) => Promise<void>

  // asynchronous, attach conditioned on runAsyncHandlers
  export type onCheckStatusChanged = (check:  any /* TODO: ITradleCheck */) => Promise<void>
  export type onResourceChanged = (opts:  any /* TODO: OnResourceChangedArg */) => Promise<void>
  export type onResourceCreated = (obj: ITradleObject) => Promise<void>
  export type onResourceDeleted = (obj: ITradleObject) => Promise<void>

  export interface Methods {
    onmessage?: onmessage
    willSend?: willSend
    willRequestForm?: willRequestForm
    willApproveApplication?: willApproveApplication
    willIssueCertificate?: willIssueCertificate
    didApproveApplication?: didApproveApplication
    willDenyApplication?: willDenyApplication
    onFormsCollected?: onFormsCollected
    onPendingApplicationCollision?: onPendingApplicationCollision
    onRequestForExistingProduct?: onRequestForExistingProduct
    onCommand?: onCommand
    getRequiredForms?: getRequiredForms
    validateForm?: validateForm
    replay?: replay

    onCheckStatusChanged?: onCheckStatusChanged
    onResourceChanged?: onResourceChanged
    onResourceCreated?: onResourceCreated
    onResourceDeleted?: onResourceDeleted
    [toBeDefined: string]: any
  }
}
export interface IPluginExports<BotComponent> {
  plugin: PluginLifecycle.Methods
  api?: BotComponent
  [customExport: string]: any
}
export interface CreatePlugin <BotComponent> {
  (components: IBotComponents, opts: IPluginOpts): IPluginExports<BotComponent>
}
export interface Applications {
  createCheck(checkR: ITradleObject, req: IPBReq): Promise<ITradleObject>
  createVerification(opts: { application: IPBApp, verification, org }): Promise<void>
  deactivateChecks(opts: {
    application: IPBApp
    type: string
    form: ITradleObject
    req: IPBReq
  }): Promise<void>
  requestEdit(object: any): Promise<void>
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
export interface IOrganization extends ITradleObject {
  name: string
  domain: string
}
export interface IConfComponents {
  // TODO: bot: IBotConf
  org: IOrganization
  // TODO: modelsPack?: ModelsPack
  style?: any
  // TODO: termsAndConditions?: DatedValue
  // TODO: kycServiceDiscovery?: KYCServiceDiscovery

  // TODO: plugins?: PluginDefinitions
}
export type ValidatePluginConfOpts = {
  bot: Bot
  conf: IConfComponents
  pluginConf: any
  utils: Utils
  errors: Errors
  [other:string]: any
}

export type UpdatePluginConfOpts = ValidatePluginConfOpts

export type ValidatePluginConf = (opts:ValidatePluginConfOpts) => Promise<void>
export type UpdatePluginConf = (opts:UpdatePluginConfOpts) => Promise<void>

export namespace errors {
  class InvalidInput extends Error {
    constructor (message: string)
  }
}

export interface Errors {
  InvalidInput: typeof errors.InvalidInput
}

export interface Res {
}
export interface Check {
  provider: string
}
export interface CheckNeedsToBeCreated {
  notMatched: {}
}
export interface Utils {
  getStatusMessageForCheck: (opts: { models: { [name: string]: Model }, check: Check }) => string
  ensureThirdPartyServiceConfigured: (conf: any, name: string) => void
  getThirdPartyServiceInfo: (conf: any, name: string) => {}
  post: (url: string, data: any, opts: any) => Promise<Res>
  getLatestForms:  (app: IPBApp) => Stub[]
  getParsedFormStubs: (app: IPBApp) => Stub[]
  doesCheckNeedToBeCreated:  (opts: {
    bot: Bot
    type: string
    application: IPBApp
    provider: string
    form: ITradleObject
    propertiesToCheck: string[]
    prop: string
    req: IPBReq
  }) => Promise<null | CheckNeedsToBeCreated>
  getChecks: (opts: {
    bot: Bot
    type: string
    application: IPBApp
    provider: string
  }) => Promise<Check[]>
  hasPropertiesChanged: (opts: {
    resource: ITradleObject
    bot: Bot
    propertiesToCheck: string[]
    req: IPBReq
  }) => Promise<boolean>

  getLatestCheck: (opts: {
    type: string
    req: IPBReq
    application: IPBApp
    bot: Bot
  }) => Promise<any>
  isSubClassOf: (type, value, obj) => boolean
  isPassedCheck: (check: any) => boolean
  getCheckParameters: (opts: {
    plugin: string
    resource: ITradleObject
    bot: Bot
    defaultPropMap: any
    map: any
  }) => Promise<{
    resource: ITradleObject
    error?: Error
  }>
}

