const t = {};

t.loading = 'Loading...';

t.brand = {};
t.brand.lg = 'MurongTech';
t.brand.mini = 'MR';
t.running = {};
t.upload = {};

t.normal={};
t.exception={};
t.id={};
t.decorate={};
t.stop={};
t.auto={};
t.not={};
t.start={};

t.add = 'Add';
t.delete = 'Delete';
t.deleteBatch = 'Delete';
t.update = 'Edit';
t.query = 'Query';
t.export = 'Export';
t.handle = 'action';
t.confirm = 'Confirm';
t.cancel = 'Cancel';
t.logout = 'Sign Out';
t.rerun = 'Rerun';
t.notrun = 'Not run';
t.flowchart = 'flow';
t.task = ' task ';
t.normal.task = 'Task:';
t.taskName = 'TaskName :';
t.normal.taskName = 'TaskName';
t.normal.status = 'Task State :';
t.decorate.status = 'Task State';
t.scan = 'Query';
t.notStart = 'Not Start';
t.stop.refresh = 'Stop Refresh';
t.auto.refresh = 'Auto Refresh';
t.note = 'Note';
t.normal.rerun={};
t.normal.rerun.orNot='Rerun or Not :';
t.not.run='Stop run or Not :';
t.skip={};
t.skip.orNot ='Skip or Not :';
t.skip.task ='Skip Task :';
t.normal.rerun.task='Rerun Task :';
t.exec={};
t.exec.success=' Execute Success ';
t.running.not={};
t.running.not.modify=' Batch Tsks Are Running,Cantnot Be Modified ';
t.show={};
t.show.log=' Log ';
t.name={};
t.create=' Create ';
t.close=' Close ';
t.normal.log=' Task Log ';
t.name.adapter='Name: ';
t.desc={};
t.desc.adapter='Description: ';
t.exec.info={};
t.exec.info.adapter='Execute Info: ';
t.exec.log={};
t.exec.log.adapter='Execute Logs: ';
t.startTime={};
t.startTime.adapter='Start Time: ';
t.endTime={};
t.endTime.adapter='End Time: ';
t.status={};
t.status.adapter='Status: ';
t.result={};
t.result.adapter='Execute Results: ';
t.batchNames={};
t.batchNames.adapter='Batch Names: ';
t.module={};
t.module.adapter='Module Names: ';
t.id.adapter='taskId: ';
t.select={};
t.select.file='Select File ';
t.upload.limit='Only upload Zip File And Size Can not exceeding 10M ';
t.upload.pattern='Only upload Zip Pattern ';
t.upload.size='Size Can not exceeding 10M ';
t.exception.error='Exception Error: ';
t.stop.batch={};
t.stop.batch.orNot='Stop Batch: ';

t.prompt = {};
t.prompt.title = 'Prompt';
t.prompt.info = 'Confirm to carry out [{handle}] operation?';
t.prompt.success = 'Succeeded';
t.prompt.failed = 'Failed';
t.prompt.deleteBatch = 'Please select delete item';
t.prompt.logout = 'Do you cancel your current account ?';

t.message = {};
t.message.logoutCancel = 'Abandoning logout users';

t.validate = {};
t.validate.required = 'Required field cannot be empty';
t.validate.format = '{attr} format error';


t.upload.text = 'Drop files here, or <em>Click Upload</em>';
t.upload.tip = 'Only support {format} format files! ';
t.upload.button = 'Click to upload';

t.datePicker = {};
t.datePicker.range = 'To';
t.datePicker.start = 'start time';
t.datePicker.end = 'end time';

t.fullscreen = {};
t.fullscreen.prompt = 'Your browser does not support this operation';

t.updatePassword = {};
t.updatePassword.title = 'Change Password';
t.updatePassword.username = 'Account';
t.updatePassword.password = 'Password';
t.updatePassword.newPassword = 'New Password';
t.updatePassword.comfirmPassword = 'Confirm Password';
t.updatePassword.validate = {};
t.updatePassword.validate.comfirmPassword = 'Confirm password is not consistent with new password input';

t.theme = {};
t.theme.d2 = 'D2Admin Classic';
t.theme.violet = 'Violet';
t.theme.line = 'Line';
t.theme.star = 'Star';
t.theme.tomorrowNightBlue = 'Tomorrow Night Blue (vsCode)';

t.layout = {};
t.layout.hello = 'Hello';
t.layout.logout = 'Logout';
t.layout.updatePassword = 'Update Password';
t.layout.tooltip = {};
t.layout.tooltip.fullscreen = 'Fullscreen';
t.layout.tooltip.fullscreenActive = 'Exit Fullscreen';
t.layout.tooltip.theme = 'Theme';
t.layout.tooltip.search = 'Search';
t.layout.search = {};
t.layout.search.placeholder = 'Search Pages';
t.layout.search.tip1 = 'Press';
t.layout.search.tip2 = 'open search panel, and press';
t.layout.search.tip3 = 'close it.';

t.layoutTab = {};
t.layoutTab.index = 'Home';
t.layoutTab.noName = 'No Name';

t.contentTabs = {};
t.contentTabs.closeCurrent = 'Close Current Tab';
t.contentTabs.closeOther = 'Close Other Tabs';
t.contentTabs.closeAll = 'Close All Tabs';

/* pages */
t.notFound = {};
t.notFound.desc = 'Sorry! <em>missing</em> on the page you visited...';
t.notFound.back = 'Previous Page';
t.notFound.home = 'Home';

t.login = {};
t.login.language = 'Language';
t.login.motto = 'Time is the most precious treasure of all wealth';
t.login.form = {};
t.login.form.placeholderUsername = 'username';
t.login.form.placeholderPassword = 'password';
t.login.form.placeholderCaptcha = 'Captcha';
t.login.form.textSubmitButton = 'Sign In';
t.login.form.textForget = 'Forget';
t.login.form.textSignUp = 'Sign up';
t.login.footer = {};
t.login.footer.buttonHelp = 'Help';
t.login.footer.buttonPrivacy = 'Privacy';
t.login.footer.buttonClause = 'Clause';
t.login.copyright = {};
t.login.copyright.p1 = 'Copyright';
t.login.copyright.p2 = '2018 D2 Projects Open Source Organizational';
t.login.copyright.p3 = '@FairyEver';
t.login.ruleMessage = {};
t.login.ruleMessage.username = 'User name must be entered';
t.login.ruleMessage.password = 'Password must be entered';
t.login.ruleMessage.captcha = 'Captcha must be entered';

t.home = {};
t.home.sysInfo = {};
t.home.sysInfo.name = 'System Name';
t.home.sysInfo.nameVal = 'Murongtech';
t.home.sysInfo.version = 'Version Information';
t.home.sysInfo.versionVal = process.env.VUE_APP_VERSION;
t.home.sysInfo.osName = 'Operating System';
t.home.sysInfo.osVersion = 'System Version';
t.home.sysInfo.osArch = 'System Architecture';
t.home.sysInfo.processors = 'CPU Core Count';
t.home.sysInfo.totalPhysical = 'system Memory';
t.home.sysInfo.freePhysical = 'Remaining Memory';
t.home.sysInfo.memoryRate = 'Memory Usage';
t.home.sysInfo.userLanguage = 'System Language';
t.home.sysInfo.jvmName = 'JVM Information';
t.home.sysInfo.javaVersion = 'JVM Version';
t.home.sysInfo.javaHome = 'JAVA_HOME';
t.home.sysInfo.userDir = 'Working Directory';
t.home.sysInfo.javaTotalMemory = 'JVM Occupies Memory';
t.home.sysInfo.javaFreeMemory = 'JVM Free Memory';
t.home.sysInfo.javaMaxMemory = 'JVM Max Memory';
t.home.sysInfo.userName = 'Current User';
t.home.sysInfo.systemCpuLoad = 'CPU Load';
t.home.sysInfo.userTimezone = 'System Time Zone';

/* modules */
t.model = {};
t.model.name = 'Name';
t.model.key = 'Information';
t.model.version = 'Version';
t.model.createTime = 'Create Time';
t.model.lastUpdateTime = 'Update Time';
t.model.design = 'Online Design';
t.model.deploy = 'Deployment';
t.model.description = 'Description';

t.process = {};
t.process.name = 'name';
t.process.key = 'Identification';
t.process.deployFile = 'Deploy process file';
t.process.id = 'Process ID';
t.process.deploymentId = 'Deployment ID';
t.process.version = 'Version';
t.process.resourceName = 'XML';
t.process.diagramResourceName = 'Image';
t.process.deploymentTime = 'Deployment Time';
t.process.active = 'Activate';
t.process.suspend = 'Hang';
t.process.convertToModel = 'Convert to model';


t.running.id = 'Instance ID';
t.running.definitionKey = 'Define Key';
t.running.processDefinitionId = 'Define ID';
t.running.processDefinitionName = 'Define the name';
t.running.activityId = 'Current Link';
t.running.suspended = 'Whether Hang';
t.running.suspended0 = 'No';
t.running.suspended1 = 'Yes';

t.news = {};
t.news.title = 'Title';
t.news.pubDate = 'Publish Time';
t.news.createDate = 'Create Time';
t.news.content = 'Content';

t.schedule = {};
t.schedule.beanName = 'Bean Name';
t.schedule.beanNameTips = 'Spring bean name, eg: testTask';
t.schedule.pauseBatch = 'Pause';
t.schedule.resumeBatch = 'Recovery';
t.schedule.runBatch = 'Execution';
t.schedule.log = 'Log List';
t.schedule.params = 'Parameters';
t.schedule.cronExpression = 'Cron Expression';
t.schedule.createCronExpression = 'Create Cron Expression';
t.schedule.cronExpressionTips = 'Example: 0 0 12 * * ?';
t.schedule.cronExpressionExplain = '0 00 23 * * ?  (Day 23:00 trigger)';
t.schedule.placeholder = '0 00 23 * * ?';
t.schedule.remark = 'remarks';
t.schedule.status = 'Status:';
t.schedule.status0 = 'Pause';
t.schedule.status1 = 'Normal';
t.schedule.statusLog0 = 'Failed';
t.schedule.statusLog1 = 'Success';
t.schedule.pause = 'Pause';
t.schedule.resume = 'Restore';
t.schedule.run = 'Execute';
t.schedule.jobId = 'Task ID';
t.schedule.times = 'Time-consuming (unit: milliseconds)';
t.schedule.createDate = 'Execution Time';

t.mail = {};
t.mail.name = 'Name';
t.mail.config = 'Mail Configuration';
t.mail.subject = 'Theme';
t.mail.createDate = 'Create Time';
t.mail.send = 'Send Mail';
t.mail.content = 'Content';
t.mail.smtp = 'SMTP';
t.mail.port = 'Port Number';
t.mail.username = 'Email Account';
t.mail.password = 'Mailbox Password';
t.mail.mailTo = 'Recipient';
t.mail.mailCc = 'Cc';
t.mail.params = 'Template Parameter';
t.mail.paramsTips = 'Example: {"code": "123456"}';
t.mail.templateId = 'Template ID';
t.mail.status = 'Status';
t.mail.status0 = 'Send Failed';
t.mail.status1 = 'Successfully Sent';
t.mail.mailFrom = 'Sender';
t.mail.createDate = 'Send Time';

t.sms = {};
t.sms.mobile = 'Mobile Number';
t.sms.status = 'Status';
t.sms.status0 = 'Send Failed';
t.sms.status1 = 'Successfully Sent';
t.sms.config = 'SMS Configuration';
t.sms.send = 'Send SMS';
t.sms.platform = 'platform Type';
t.sms.platform1 = 'Alibaba Cloud';
t.sms.platform2 = 'Tencent Cloud';
t.sms.params = 'Parameters';
t.sms.paramsTips = 'eg: {"code": "123456"}';
t.sms.params1 = 'Parameter 1';
t.sms.params2 = 'Parameter 2';
t.sms.params3 = 'Parameter 3';
t.sms.params4 = 'Parameter 4';
t.sms.createDate = 'Send Time';
t.sms.aliyunAccessKeyId = 'Key';
t.sms.aliyunAccessKeyIdTips = 'Alibaba Cloud AccessKeyId';
t.sms.aliyunAccessKeySecret = 'Secret';
t.sms.aliyunAccessKeySecretTips = 'Alibaba Cloud AccessKeySecret';
t.sms.aliyunSignName = 'SMS Signature';
t.sms.aliyunTemplateCode = 'SMS Template';
t.sms.aliyunTemplateCodeTips = 'SMS Template CODE';
t.sms.qcloudAppId = 'AppId';
t.sms.qcloudAppIdTips = 'Tencent Cloud AppId';
t.sms.qcloudAppKey = 'AppKey';
t.sms.qcloudAppKeyTips = 'Tencent Cloud AppKey';
t.sms.qcloudSignName = 'SMS Signature';
t.sms.qcloudTemplateId = 'SMS Template';
t.sms.qcloudTemplateIdTips = 'SMS template ID';

t.oss = {};
t.oss.config = 'Cloud Storage Configuration';
t.oss.upload = 'Upload File';
t.oss.url = 'URL Address';
t.oss.createDate = 'Create Time';
t.oss.type = 'Type';
t.oss.type1 = 'Seven Cows';
t.oss.type2 = 'Alibaba Cloud';
t.oss.type3 = 'Tencent Cloud';
t.oss.type4 = 'FastDFS';
t.oss.type5 = 'Local Upload';
t.oss.qiniuDomain = 'Domain Name';
t.oss.qiniuDomainTips = 'Seven cattle bound domain name';
t.oss.qiniuPrefix = 'Path Prefix';
t.oss.qiniuPrefixTips = 'Do not set default to empty';
t.oss.qiniuAccessKey = 'AccessKey';
t.oss.qiniuAccessKeyTips = 'Seven cattle AccessKey';
t.oss.qiniuSecretKey = 'SecretKey';
t.oss.qiniuSecretKeyTips = 'Seven Cow SecretKey';
t.oss.qiniuBucketName = 'Space Name';
t.oss.qiniuBucketNameTips = 'Seven cattle storage space name';
t.oss.aliyunDomain = 'Domain Name';
t.oss.aliyunDomainTips = 'Alibaba Cloud bound domain name, such as: http://cdn.murong.io';
t.oss.aliyunPrefix = 'Path Prefix';
t.oss.aliyunPrefixTips = 'Do not set default to empty';
t.oss.aliyunEndPoint = 'EndPoint';
t.oss.aliyunEndPointTips = 'Ali Cloud EndPoint';
t.oss.aliyunAccessKeyId = 'AccessKeyId';
t.oss.aliyunAccessKeyIdTips = 'Alibaba Cloud AccessKeyId';
t.oss.aliyunAccessKeySecret = 'AccessKeySecret';
t.oss.aliyunAccessKeySecretTips = 'Alibaba Cloud AccessKeySecret';
t.oss.aliyunBucketName = 'BucketName';
t.oss.aliyunBucketNameTips = 'Alibaba Cloud BucketName';
t.oss.qcloudDomain = 'Domain Name';
t.oss.qcloudDomainTips = 'Tencent cloud bound domain name';
t.oss.qcloudPrefix = 'Path Prefix';
t.oss.qcloudPrefixTips = 'Do not set default to empty';
t.oss.qcloudAppId = 'AppId';
t.oss.qcloudAppIdTips = 'Tencent Cloud AppId';
t.oss.qcloudSecretId = 'SecretId';
t.oss.qcloudSecretIdTips = 'Tencent Cloud SecretD';
t.oss.qcloudSecretKey = 'SecretKey';
t.oss.qcloudSecretKeyTips = 'Tencent Cloud SecretKey';
t.oss.qcloudBucketName = 'BucketName';
t.oss.qcloudBucketNameTips = 'Tencent Cloud BucketName';
t.oss.qcloudRegion = 'Affiliate';
t.oss.qcloudRegionTips = 'Please Select';
t.oss.qcloudRegionBeijing1 = 'Beijing District 1 (North China)';
t.oss.qcloudRegionBeijing = 'Beijing';
t.oss.qcloudRegionShanghai = 'Shanghai (East China)';
t.oss.qcloudRegionGuangzhou = 'Guangzhou (South China)';
t.oss.qcloudRegionChengdu = 'Chengdu (Southwest)';
t.oss.qcloudRegionChongqing = 'Chongqing';
t.oss.qcloudRegionSingapore = 'Singapore';
t.oss.qcloudRegionHongkong = 'HongKong';
t.oss.qcloudRegionToronto = 'Toronto';
t.oss.qcloudRegionFrankfurt = 'Frankfurt';
t.oss.localDomain = 'Domain Name';
t.oss.localDomainTips = 'Binded domain name, eg http://cdn.murong.io';
t.oss.fastdfsDomain = 'Domain Name';
t.oss.fastdfsDomainTips = 'Binded domain name, eg http://cdn.murong.io';
t.oss.localPrefix = 'Path Prefix';
t.oss.localPrefixTips = 'Do not set default to empty';
t.oss.localPath = 'Storage Directory';
t.oss.localPathTips = 'eg: D:/upload';

t.dept = {};
t.dept.name = 'Name';
t.dept.parentName = 'Superior';
t.dept.sort = 'Sort';
t.dept.parentNameDefault = 'Top Department';

t.dict = {};
t.dict.dictName = 'Name';
t.dict.dictType = 'Type';
t.dict.dictValue = 'Value';
t.dict.sort = 'Sort';
t.dict.remark = 'Remarks';
t.dict.createDate = 'Create Date';

t.logError = {};
t.logError.requestUri = 'Request URI';
t.logError.requestMethod = 'Request Method';
t.logError.requestParams = 'Request Parameters';
t.logError.ip = 'IP';
t.logError.userAgent = 'User Agent';
t.logError.createDate = 'Create Date';
t.logError.errorInfo = 'Exception';

t.logLogin = {};
t.logLogin.creatorName = 'Username';
t.logLogin.status = 'Status';
t.logLogin.status0 = 'Failed';
t.logLogin.status1 = 'Success';
t.logLogin.status2 = 'Locked';
t.logLogin.operation = 'User Action';
t.logLogin.operation0 = 'Login';
t.logLogin.operation1 = 'Exit';
t.logLogin.ip = 'IP';
t.logLogin.userAgent = 'User-Agent';
t.logLogin.createDate = 'Create Date';

t.logOperation = {};
t.logOperation.status = 'Status';
t.logOperation.status0 = 'Failed';
t.logOperation.status1 = 'Success';
t.logOperation.creatorName = 'Username';
t.logOperation.operation = 'User Action';
t.logOperation.requestUri = 'Request URI';
t.logOperation.requestMethod = 'Request Mode';
t.logOperation.requestParams = 'Request Parameters';
t.logOperation.requestTime = 'Request Duration';
t.logOperation.ip = 'IP';
t.logOperation.userAgent = 'User-Agent';
t.logOperation.createDate = 'Create Date';

t.menu = {};
t.menu.name = 'Name';
t.menu.icon = 'Icon';
t.menu.type = 'Type';
t.menu.type0 = 'Menu';
t.menu.type1 = 'Button';
t.menu.sort = 'Sort';
t.menu.url = 'Route';
t.menu.permissions = 'Auth ID';
t.menu.permissionsTips = 'Multiple separated by commas, such as: sys:menu:save,sys:menu:update';
t.menu.parentName = 'Superior';
t.menu.parentNameDefault = 'Top Menu';
t.menu.resource = 'Auth Resources';
t.menu.resourceUrl = 'Resource URL';
t.menu.resourceMethod = 'Request Method';
t.menu.resourceAddItem = 'Add an Item';

t.params = {};
t.params.paramCode = 'Code';
t.params.paramValue = 'Value';
t.params.remark = 'Remarks';

t.role = {};
t.role.name = 'Name';
t.role.remark = 'Remarks';
t.role.createDate = 'Create Date';
t.role.menuList = 'Menu Scope';
t.role.deptList = 'Data Scope';

t.user = {};
t.user.username = 'Username';
t.user.deptName = 'Department';
t.user.email = 'Email';
t.user.mobile = 'Mobile';
t.user.status = 'Status';
t.user.status0 = 'Disable';
t.user.status1 = 'Enable';
t.user.createDate = 'Create Date';
t.user.password = 'Password';
t.user.comfirmPassword = 'Confirm';
t.user.realName = 'Real Name';
t.user.gender = 'Gender';
t.user.gender0 = 'Male';
t.user.gender1 = 'Female';
t.user.gender2 = 'Secure';
t.user.roleIdList = 'Role Config';
t.user.validate = {};
t.user.validate.comfirmPassword = 'Confirm password is not consistent with password input';

t.flow = {};
t.flow.contextMenu = {};
t.flow.contextMenu.skip = 'Skip';

t.batch = {};
t.batch.name = 'name';
t.batch.batchStatus = {};
t.batch.batchStatus.status = 'status';
t.batch.batchStatus.P = 'processing';
t.batch.batchStatus.K = 'skip';
t.batch.batchStatus.S = 'success';
t.batch.batchStatus.T = 'stop';
t.batch.batchStatus.O = 'other';
t.batch.batchStatus.F = 'fail';
t.batch.batchStatus.U = 'unk';
t.batch.download='down';
t.batch.info='Info';
t.batch.flow='flow';
t.batch.config='config';
t.batch.start='Start';
t.batch.upload='Upload';
t.batch.filename='fileName';
t.batch.tmsmp='tmsmp';
t.batch.oper='oper';
t.batch.validStatus='valid';
t.batch.invalidStatus='invalid';
t.batch.startBatchConfirm='start batch:{0}?';
t.batch.startBatchResult='batch:{0} start successful';
t.batch.batchConfig='Batch Configs';
t.batch.cronTime='Cron Time';
t.batch.cronPeroid='Period';
t.batch.cronPeroidDay='Day';
t.batch.cronPeroidHour='Hour';
t.batch.cronPeroidMinute='Minute';
t.batch.cronPeroidWeek='Week';
t.batch.cronPeroidMonth='Month';
t.batch.cronPeroidYear='Year';
t.batch.batchTaskLists='Batch Task Lists';
t.batch.batchInstances='Batch Instance:';
t.batch.instances={};
t.batch.instances.decorate='Batch Instances';
t.batch.batchInstance='Instance';
t.batch.flowcharts = 'Batch Flowcharts';
t.batch.names={};
t.batch.rerun={};
t.batch.skip={};
t.batch.begin={};
t.batch.names.adapter='Batch Name: ';
t.batch.batchNames = 'Batch Name';
t.batch.notRun ='Batch not Run';
t.batch.begin.orNot='Start Batch or Not :';
t.batch.rerun.orNot='Rerun Batch or Not :';
t.batch.skip.orNot='Skip Batch or Not :';
t.skip.batch='Skip Batch:';
t.start.batchTasks=' Start Batch Tasks ';
t.batch.tasks='Batch Tasks :';
t.batch.begin.success=' Start Success ';
t.batch.rerun.success=' Rerun Success ';
t.batch.rerun.text = "rerun"
t.batch.skip.success=' Skip Success ';
t.batch.make={};
t.batch.make.success=' Successfully Set  ';
t.batch.query='query';
export default t
