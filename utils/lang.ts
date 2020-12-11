import { LangType } from './constants'

const LangStrings: Record<LangType, any> = {
  en: {
    usersPage: 'User Manager',
    users: 'Users',
    documentPage: 'Document Manager',
    tracerPage: 'Tracer Manager',
    apiKeyPage: 'Api-Key Manager',
    statisticsPage: 'Statistics',
    chooseLang: 'Choose language',
    login: 'Login',
    home: 'Home',
    off: 'OFF',
    on: 'ON',
    validTo: 'Valid To',
    validFrom: 'Valid From',
    version: 'Version',
    expiration: 'Expiration',
    createdAt: 'Created At',
    logout: 'Logout',
    platform: 'Platform',
    accountId: 'Account ID',
    detail: 'Detail',

    status: 'Status',
    firstName: 'First Name',
    lastName: 'Last Name',
    updatedAt: 'Updated At',
    submittedAt: 'Submitted At',
    enabled: 'Enabled',
    info: 'Info',
    noData: 'There are no',
    applications: 'Applications',
    filterApplications: 'Filter Applications',
    setTypeDate: 'Set Type Date',
    setDateRange: 'Set Date Range',
    setApplicationStatus: 'Set Application Status',
    setName: 'Set Name',
    documents: 'Documents',
    beginReview: 'Begin review',
    applicationInfo: 'Appplication Info',
    applicationStatus: 'Application status',
    countryName: 'Country Name',
    countryIsoCode: 'Country ISO Code',
    dateTime: 'Date Time',
    applicationId: 'Application ID',
    backToApplications: 'Back to Applications',
    nextApplication: 'Next Application',
    fileName: 'File name',
    typeFile: 'Type file',
    documentInfo: 'Document Info',
    image: 'Image',
    overview: 'Overview',
    previous: 'Previous',
    next: 'Next',
    approve: 'Approve',
    reject: 'Reject',
    confirmApplication: 'Confirm Application',
    checkBeeline: 'Check Beeline',
    rejectApplication: 'Reject Application',
    rejectedDocuments: 'Rejected Documents',
    approvedDocuments: 'Approved Documents',
    type: 'Type',
    gender: 'Gender',
    personalNumber: 'Personal Number',
    number: 'Number',
    country: 'Country',
    nationality: 'Nationality',
    issueDate: 'Issue Date',
    expritaionDate: 'Expiration Date',
    dateOfBirth: 'Date Of Birth',
    passportInfo: "Passport Info'",
    document: 'Document',
    issuingAuth: 'Issuing Auth',
    address: 'Address',
    noMessages: 'There are no messages',
    noErrors: 'There are no messages',
    searchTracer: 'Search tracer',
    search: 'Search',
    hasPassword: 'Has Password',
    ok: 'Ok',
    username: 'Username',
    password: 'Password',
    fullName: 'Full Name',
    passportId: 'Passport ID',
    advancedSearch: 'Advanced search',
    detailInfo: 'Detail Info',
    removeSession: 'Remove Session',
    remove: 'Remove',
    suspendSession: 'Suspend Session',
    setTracing: 'Set Tracing',
    sessionId: 'Session ID',
    ip: 'IP',
    method: 'Method',
    deviceName: 'Device Name',
    noSessions: 'There no sessions',
    privateIP: 'Private IP address',
    blackList: 'Black List',
    userEmails: 'User Emails',
    userPhones: 'User Phones',
    changePassword: 'Change password',
    generatePassword: 'Generate Password',
    changeTheme: 'Change theme website',
    userAuth: 'User Auth',
    profileInfo: 'Profile info',
    createApiKey: 'Create APi Key',
    noApplications: 'There are no applications',
    noBlackList: 'There are no black list available',
    noEmails: 'There are no emails available',
    noPhones: 'There are no phones available',
    setGroups: 'Set Groups',
    phoneNumber: 'Phone Number',
    apiKeys: 'API Keys',
    noDocuments: 'There are no documents',
    editDocument: 'Edit Document',
    confirmDocument: 'Confirm Document',
    noUsers: 'There are no users',
    noApiKeys: 'There no API keys',
    applicationAlreadyOpen: 'Application is already open',
    cancel: 'Cancel',
    email: 'Email',
    slogan: 'An example site showcasing a bilingual site with GatsbyJS.',
    signInToAccount: 'Please sign in to your account',
    tamos: 'Tamos',
    salom: 'Salom',
    avatar: 'Avatar',
    sessions: 'Sessions',
    from: 'from',
    to: 'to',
    admin: 'Admin Portal',
    filterAccountByDate: 'Search Account By Date',
    geoLocation: 'Geo Location',
    location: 'Location',
    firstTooltip: 'First Page',
    lastTooltip: 'Last Page',
    previousTooltip: 'Previous Page',
    nextTooltip: 'Next Page',
    showDetail: 'Show Detail',
    save: 'Save',
    labelRowsSelect: 'Rows',
    tracerMessages: 'Tracer Messages',
    tracerErrors: 'Tracer Errors',
    newDocuments: 'New documents',
    anyDocuments: 'Any documents',
    noSets: 'There are no sets',
    documentType: 'Document Type',
    settings: 'Settings',
    identifier: 'Identifier',
    deliveryType: 'Delivery Type',
    activated: 'Activated',
    authCodes: 'Auth Codes',
    authentication: 'Authentication',
    resendCode: 'Resend code',
    send: 'Send',
  },
  ru: {
    settings: 'Настройка',
    documentType: 'Тип документа',
    newDocuments: 'Новые документы',
    anyDocuments: 'Все документы',
    location: 'Локация',
    filterAccountByDate: 'Поиск аккаунт по дате',
    admin: 'Админ Портал',
    tamos: 'Тамос',
    salom: 'Салом',
    avatar: 'Аватар',
    detail: 'Подробно',
    signInToAccount: 'Пожалуйста, войдите в свой аккаунт',
    usersPage: 'Управление пользователями',
    documentPage: 'Управление документами',
    tracerPage: 'Трасировака',
    apiKeyPage: 'Управление ключами API',
    apiKeys: ' API ключы',
    noApiKeys: 'Нет API ключы',
    statisticsPage: 'Статистика',
    chooseLang: 'Сменить язык',
    login: 'Войти',
    home: 'Home',
    off: 'Выкл',
    on: 'Вкл',
    enabled: 'Включить',
    cancel: 'Отмена',
    validTo: 'Действует до',
    validFrom: 'Действует c',
    version: 'Версия',
    expiration: 'Срок действия',
    createdAt: 'Дата создания',
    logout: 'Выход',
    platform: 'Платформа',
    accountId: 'ID Аккаунта',
    status: 'Статус',
    method: 'Метод',
    firstName: 'Имя',
    lastName: 'Фамилия',
    updatedAt: 'Дата обновления',
    submittedAt: 'Дата отправки',
    info: 'Информация',
    createApiKey: 'Создать Api ключ',
    applications: 'Приложения',
    filterApplications: 'Фильтр заявок"',
    setTypeDate: 'Выбрать тип даты',
    setDateRange: 'Выбрать диапазон даты',
    setApplicationStatus: 'Выбрать статус документа',
    setName: 'Имя набора',
    documnets: 'Документы',
    beginReview: 'Начать просмотр',
    applicationInfo: 'Информация о заявке',
    applicationStatus: 'Статус заявки',
    countryName: 'Имя страны',
    countryIsoCode: 'Код страны',
    dateTime: 'Дата и время',
    applicationId: 'ID заявкы',
    backToApplications: 'Вернуться к заявкам',
    nextApplication: 'Следующая заявка',
    fileName: 'Имя файла',
    typeFile: 'Тип файла',
    documentInfo: 'Информация о документе',
    image: 'Изображения',
    overview: 'Обзор',
    previous: 'Предыдущий',
    next: 'Cледующий',
    approve: 'Подтвердить',
    documents: 'Документы',
    reject: 'Отклонить',
    confirmApplication: 'Подтвердить заявку',
    checkBeeline: 'Сверить с Билайном',
    rejectApplication: 'Отклонить заявку',
    rejectedDocuments: 'Отклоненные документы',
    approvedDocuments: 'Подтвержденные документы',
    type: 'Тип',
    gender: 'Пол',
    save: 'Сохранить',
    personalNumber: 'Национальный ID',
    number: 'Номер',
    country: 'Страна',
    nationality: 'Национальность',
    issueDate: 'Дата выпуска',
    expritaionDate: 'Дата окончания',
    dateOfBirth: 'Дата рожения',
    passportInfo: 'Информация о паспорте',
    document: 'Документ',
    issuingAuth: 'Выдача Auth',
    address: 'Адрес',
    noMessages: 'Нет сообщений',
    tracerMessages: 'Трасировака сообщений',
    tracerErrors: 'Трасировка ошибок',
    noErrors: 'Ошибок нет',
    searchTracer: 'Поиск тарсировок',
    search: 'Поиск',
    hasPassword: 'Имеет пароль',
    ok: 'Ок',
    password: 'Пароль',
    username: 'Имя пользователя',
    fullName: 'ФИО',
    passportId: 'ID паспорта',
    advancedSearch: 'Расширенный поиск',
    detailInfo: 'Подробная информация',
    removeSession: 'Удалить сессию',
    remove: 'Удалить',
    geoLocation: 'Геолокация',
    suspendSession: 'Приостановить сессию',
    setTracing: 'Включить трасировку',
    sessionId: 'ID сесси',
    ip: 'IP',
    deviceName: 'Имя устройства',
    noSessions: 'Нет сесси',
    sessions: 'Сессии',
    privateIP: 'Частный IP-адрес',
    blackList: 'Черный список',
    email: 'Почта',
    userEmails: 'Эл. почты пользователя',
    userPhones: 'Телефоны пользователя',
    changePassword: 'Сменить пароль',
    generatePassword: 'Создать пароль',
    changeTheme: 'Сменить тему сайта',
    userAuth: 'Аутентификация пользователя"',
    profileInfo: 'Информация профиля',
    noApplications: 'Нет заявок',
    noBlackList: 'Нет черного списка',
    noEmails: 'Нет доступных email адресов',
    noPhones: 'Нет доступных телефонов',
    setGroups: 'Набор группы',
    phoneNumber: 'Номер телефона',
    noDocuments: 'Нет документов',
    editDocument: 'Редактировать документ',
    confirmDocument: 'Подтвердить документ',
    noUsers: 'Нет пользователей',
    showDetail: 'Открыть подробно',
    users: 'Пользователи',
    applicationAlreadyOpen: 'Заявка уже открыто',
    slogan: 'Um site bilíngue de exemplo feito com GatsbyJS.',
    from: 'от',
    to: 'до',
    firstTooltip: 'Первая страница',
    lastTooltip: 'Последная страница',
    previousTooltip: 'Предыдущая страница',
    nextTooltip: 'Следующая Страница',
    labelRowsSelect: 'Строка',
    identifier: 'Идентификатор',
    noSets: 'Нет набор группы',
    deliveryType: 'Тип доставки',
    activated: 'Активирован',
    authCodes: 'Коды авторизации',
    authentication: 'Аутентификация',
    resendCode: 'Отправить код',
    send: 'Отправить',
  },
}
export default LangStrings
