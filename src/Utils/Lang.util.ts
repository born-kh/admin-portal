import { LangType } from '@utils/constants'

const LangStrings: Record<LangType, any> = {
  en: {
    enterCode: 'Enter code',
    loginWithLogin: 'Login with login and password',
    loginWithEmail: 'Login with E-mail and password',
    loginWithPhoneNumber: 'Login by phone number',
    password: 'Password',
    sendCode: 'Send code',
    alternativeLogin: 'Alternative login methods',
    further: 'Further',
    pleaseEnterMobileNumber: 'Please enter your mobile phone number',
    enterTheNumber: 'Enter the number',
    requestSmsAgain: 'Request SMS again',
    pleaseCompleteTheAuthorization:
      'Please complete the authorization process by entering your 4-digit activation code',
    phoneNumber: 'Phone number',
    yourBusinessAccount: 'Your Business Account',
    thisFieldRequired: 'This field is required',
    privacyPolicy: 'Privacy Policy',
    userAgreement: 'User Agreement',
    confirmUserAgreement: 'I confirm that I have read, understand and agree to the terms and conditions',
    descriptionHelpertext: 'Describe what your company is doing that you represent. Maximum 200 characters.',
    categoryHelpertext: 'Select the category in which your organization operates',
    nameHelpertext: 'Use your organization or brand name.',
    description: 'Description',
    name: 'Name',
    firstName: 'First name',
    lastName: 'Last name',
    selectCategory: 'Select a category',
    expirationDate: 'Expiration Date',
    issuingAuth: 'Issuing authority',
    numberOfPassport: 'Passport number',
    issueDate: 'Issue Date',
    numberINN: 'Taxpayer ID',
    birthDate: 'Birth date',
    createdAccount: ' Created account',
    to: 'To',
    createdAt: 'Created At',
    status: 'Status',
    cost: 'Cost',
    detailed: 'Detailed',
    updatedAt: 'Updated At',
    ok: 'Ok',
    setArchive: 'Set archive',
    active: 'Active',
    username: 'Username',
    createSmppProfile: 'Create SMPP Profile',
    smppChanged: 'SMPP changed',
    smppCreated: 'SMPP created',
    sessions: 'Sessions',
    auth: 'Auth',
    smsGateway: 'SMS Gateway',
    businessName: 'Profile',
    tryItOut: 'Try it out',
    smsStatistics: 'SMS statistics',
    smppProfiles: 'SMPP Profiles',
    device: 'Device',
    platform: 'Platform',
    suspended: 'Suspended',
    createSession: 'Create session',
    sessionDeleted: 'Session deleted',
    sessionCreated: 'Session created',
    update: 'Update',
    refresh: 'Refresh',
    cannotUndo: 'You cannot undo this operation.',
    deleteQuestion: 'Are you sure you want to delete this entry?',
    cancel: 'Cancel',
    delete: 'Delete',
    logout: 'Logout',
    messages: 'Messages',
    from: 'From',
    registeredPhoneNumber: 'Registered phone number',
    message: 'Message',
    sendMessage: 'Send Message',
    tryItCode: 'Try it out with code',
    copy: 'Copy',
    accountId: 'Account ID',
    sessionId: 'Session ID',
    deviceName: 'Device Name',
    deviceId: 'Device ID',
    apiKey: 'API Key',
    version: 'Version',
    ip: 'IP',
    registerIp: 'Register IP',
    lang: 'Lang',
    tracing: 'Tracing',
    sessionInfo: 'Session Info',
    loginMinErrorText: 'Login is too short - should be 3 chars minimum',
    passwordMinErrorText: 'Password is too short - should be 3 chars minimum',
    codeMinErrortext: 'Code is too short - should be 4 chars minimum',
    phoneNumberRequired: 'Phone number is required',
    codeRequired: 'Code is required',
    login: 'Войти',
    businessAccount: 'Business Account',
    requiredField: 'Please fill this field',
    errorPleaseConfrim: 'Please confirm!',
    register: 'Register',
    create: 'Create',
    verified: 'Verified',
    notVerified: 'Not verified',
    copied: 'Copied',
    topUpBalance: 'Top up balance',
    selectTopUpBalance: 'Please select your top-up amount',
    paymentCompleted: 'Transaction completed by',
    payment: 'Payment',
    generatePassword: 'Generate password',
    settings: 'Settings',
    edit: 'Edit',
    generateNewPassword: 'Generate new password',
    noPassword: "You don't have a password",
    hasPassword: 'You have a password',
    selectSession: 'Select session',
    tryItOutCode: 'Try It Out Code',
    sources: 'Sources',
    createSource: 'Create Source',
    source: 'Source',
    balance: 'Balance',
    reservedFundsAmount: 'Reserved Funds Amount',
    cretidAmount: 'Cretid Amount',
    totalAmount: 'Total Amount',
    debitAmount: 'Debit Amount',
    spendableAmount: 'Spendable Amount',
    alreadyExists: 'Already Exists, try another name',
    body: 'Body',
    bodyType: 'Type body',
    updatedAccount: 'Updated Account',

    selectSource: 'Select source',
  },

  ru: {
    selectSource: 'Выберите источник',
    updatedAccount: 'Updated Account',
    bodyType: 'Тип тело',
    body: 'Тело',
    alreadyExists: 'Уже существует, попробуйте другое название',
    reservedFundsAmount: 'Сумма зарезервированных средств',
    cretidAmount: 'Сумма кредита',
    totalAmount: 'Сумма итого',
    debitAmount: 'Сумма дебета',
    spendableAmount: 'Расходуемая сумма',

    balance: 'Баланc',
    source: 'Источник',
    createSource: 'Создать источник',
    sources: 'Источники',
    update: 'Обновить',
    sessionCreated: 'Сессия создана',
    sessionDeleted: 'Сессия удалена',
    tryItOutCode: 'Попробовать этот код',
    hasPassword: 'У вас есть пароль',
    noPassword: 'У вас нет пароль',
    generateNewPassword: 'Сгенерировать новый пароль',
    edit: 'Редактировать',
    settings: 'Настройки',
    generatePassword: 'Сгенерировать пароль',
    topUpBalance: 'Пополнить баланс',
    selectTopUpBalance: 'Пожалуйста, выберите сумму пополнения',
    paymentCompleted: 'Транзакция завершена',
    payment: 'Оплата',
    copied: 'Скопировано',
    verified: 'Подтверждено',
    notVerified: 'Не подтверждено',
    create: 'Создать',
    register: 'Регистрация',
    requiredField: 'Заполните это поле',
    errorPleaseConfrim: 'Подтвердите',
    enterCode: 'Введите код',
    logout: 'Выход',
    loginWithLogin: 'Вход с помощью логина и пароля',
    loginWithEmail: 'Вход с помощью E-mail и пароля',
    loginWithPhoneNumber: 'Вход по номеру телефона',
    password: 'Пароль',
    sendCode: 'Отправить код',
    alternativeLogin: 'Альтернативные способы входа',
    further: 'Далее',
    login: 'Войти',
    businessAccount: 'Business Account',
    pleaseEnterMobileNumber: 'Пожалуйста, введите номер вашего мобильного телефона',
    enterTheNumber: 'Введите номер',
    requestSmsAgain: 'Запросить SMS повторно',
    pleaseCompleteTheAuthorization: 'Пожалуйста, завершите процесс авторизации, введя 4-значный код активации',
    phoneNumber: 'Номер телефона',
    yourBusinessAccount: 'Your Business Account',
    thisFieldRequired: 'это поле обязательно для заполнения',
    privacyPolicy: ' Политикой конфиденциальности',
    userAgreement: 'Пользовательского соглашения',
    confirmUserAgreement: 'Подтверждаю прочтение и полное согласия с условиями',
    descriptionHelpertext: ' Опишите, чем занимается ваша компания, которую вы представляете. Максимум 200 символов.',
    categoryHelpertext: 'Выберите категорию, в которой работает ваша организация',
    nameHelpertext: 'Используйте название вашей организации или бренда.',
    description: 'Описание',
    name: 'Название',
    firstName: 'Имя',
    lastName: 'Фамилия',
    selectCategory: 'Выберите категорию',
    expirationDate: 'Срок действия',
    issuingAuth: 'Орган, выдавший документ',
    numberOfPassport: 'Номер паспорта',
    issueDate: 'Дата выдачи',
    numberINN: 'Номер ИНН',
    birthDate: 'Дата рождения',
    createdAccount: ' Аккаунт создан',
    to: 'Кому',
    createdAt: 'Дата создания',
    status: 'Статус',
    cost: 'Cost',
    detailed: 'Подробно',
    updatedAt: 'Дата обновления',
    ok: 'Ок',
    setArchive: 'Set archive',
    active: 'Активный',
    username: 'Имя пользователя',
    createSmppProfile: 'Создать профиль SMPP',
    smppChanged: 'SMPP профиль изменен',
    smppCreated: 'SMPP профиль создан',
    sessions: 'Сессии',
    auth: 'Авторизация',
    smsGateway: 'SMS-шлюз',
    businessName: 'Профиль',
    tryItOut: 'Попробуйте',
    smsStatistics: 'СМС статистика',
    smppProfiles: 'Профили SMPP',
    device: 'Устройство',
    platform: 'Платформа',
    suspended: 'Приостановлено',
    createSession: 'Создать новую сессию',
    refresh: 'Обновить',
    cannotUndo: 'Вы не можете отменить эту операцию.',
    deleteQuestion: 'Вы уверены, что хотите удалить эту запись?',
    cancel: 'Отменить',
    delete: 'Удалить',
    messages: 'Сообщения',
    from: 'Из',
    registeredPhoneNumber: 'Зарегистрированный номер телефона',
    message: 'Сообщение',
    sendMessage: 'Отправить сообщение',
    tryItCode: 'Попробуйте с кодом',
    copy: 'Копировать',
    accountId: 'ID аккаунта',
    sessionId: 'ID  сессии',
    deviceName: 'Имя устройства',
    deviceId: 'ID устройства',
    apiKey: 'Ключ API',
    version: 'Версия',
    ip: 'IP',
    registerIp: 'Регистр IP',
    lang: 'Язык',
    tracing: 'Отслеживание',
    sessionInfo: 'Информация о сеансе',
    loginMinErrorText: 'Логин слишком короткий - должен содержать минимум 3 символа',
    passwordMinErrorText: 'Пароль слишком короткий - должен содержать минимум 3 символа.',
    codeMinErrortext: 'Код слишком короткий - должен содержать минимум 4 символа',
    phoneNumberRequired: 'Номер телефона обязателен',
    codeRequired: 'Код обязателен',
    selectSession: 'Выберите сессию',
  },
}
export default LangStrings