!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(d){var i;d.extend(d.fn,{validate:function(t){if(this.length){var s=d.data(this[0],"validator");return s||(this.attr("novalidate","novalidate"),s=new d.validator(t,this[0]),d.data(this[0],"validator",s),s.settings.onsubmit&&(this.on("click.validate",":submit",function(t){s.submitButton=t.currentTarget,d(this).hasClass("cancel")&&(s.cancelSubmit=!0),void 0!==d(this).attr("formnovalidate")&&(s.cancelSubmit=!0)}),this.on("submit.validate",function(i){function t(){var t,e;return s.submitButton&&(s.settings.submitHandler||s.formSubmitted)&&(t=d("<input type='hidden'/>").attr("name",s.submitButton.name).val(d(s.submitButton).val()).appendTo(s.currentForm)),!(s.settings.submitHandler&&!s.settings.debug)||(e=s.settings.submitHandler.call(s,s.currentForm,i),t&&t.remove(),void 0!==e&&e)}return s.settings.debug&&i.preventDefault(),s.cancelSubmit?(s.cancelSubmit=!1,t()):s.form()?s.pendingRequest?!(s.formSubmitted=!0):t():(s.focusInvalid(),!1)})),s)}t&&t.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing.")},valid:function(){var t,e,i;return d(this[0]).is("form")?t=this.validate().form():(i=[],t=!0,e=d(this[0].form).validate(),this.each(function(){(t=e.element(this)&&t)||(i=i.concat(e.errorList))}),e.errorList=i),t},rules:function(t,e){var i,s,n,r,a,o,l=this[0],h=void 0!==this.attr("contenteditable")&&"false"!==this.attr("contenteditable");if(null!=l&&(!l.form&&h&&(l.form=this.closest("form")[0],l.name=this.attr("name")),null!=l.form)){if(t)switch(i=d.data(l.form,"validator").settings,s=i.rules,n=d.validator.staticRules(l),t){case"add":d.extend(n,d.validator.normalizeRule(e)),delete n.messages,s[l.name]=n,e.messages&&(i.messages[l.name]=d.extend(i.messages[l.name],e.messages));break;case"remove":return e?(o={},d.each(e.split(/\s/),function(t,e){o[e]=n[e],delete n[e]}),o):(delete s[l.name],n)}return(r=d.validator.normalizeRules(d.extend({},d.validator.classRules(l),d.validator.attributeRules(l),d.validator.dataRules(l),d.validator.staticRules(l)),l)).required&&(a=r.required,delete r.required,r=d.extend({required:a},r)),r.remote&&(a=r.remote,delete r.remote,r=d.extend(r,{remote:a})),r}}}),d.extend(d.expr.pseudos||d.expr[":"],{blank:function(t){return!d.trim(""+d(t).val())},filled:function(t){var e=d(t).val();return null!==e&&!!d.trim(""+e)},unchecked:function(t){return!d(t).prop("checked")}}),d.validator=function(t,e){this.settings=d.extend(!0,{},d.validator.defaults,t),this.currentForm=e,this.init()},d.validator.format=function(i,t){return 1===arguments.length?function(){var t=d.makeArray(arguments);return t.unshift(i),d.validator.format.apply(this,t)}:(void 0===t||(2<arguments.length&&t.constructor!==Array&&(t=d.makeArray(arguments).slice(1)),t.constructor!==Array&&(t=[t]),d.each(t,function(t,e){i=i.replace(new RegExp("\\{"+t+"\\}","g"),function(){return e})})),i)},d.extend(d.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:d([]),errorLabelContainer:d([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(t){this.lastActive=t,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,t,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(t)))},onfocusout:function(t){this.checkable(t)||!(t.name in this.submitted)&&this.optional(t)||this.element(t)},onkeyup:function(t,e){9===e.which&&""===this.elementValue(t)||-1!==d.inArray(e.keyCode,[16,17,18,20,35,36,37,38,39,40,45,144,225])||(t.name in this.submitted||t.name in this.invalid)&&this.element(t)},onclick:function(t){t.name in this.submitted?this.element(t):t.parentNode.name in this.submitted&&this.element(t.parentNode)},highlight:function(t,e,i){"radio"===t.type?this.findByName(t.name).addClass(e).removeClass(i):d(t).addClass(e).removeClass(i)},unhighlight:function(t,e,i){"radio"===t.type?this.findByName(t.name).removeClass(e).addClass(i):d(t).removeClass(e).addClass(i)}},setDefaults:function(t){d.extend(d.validator.defaults,t)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:d.validator.format("Please enter no more than {0} characters."),minlength:d.validator.format("Please enter at least {0} characters."),rangelength:d.validator.format("Please enter a value between {0} and {1} characters long."),range:d.validator.format("Please enter a value between {0} and {1}."),max:d.validator.format("Please enter a value less than or equal to {0}."),min:d.validator.format("Please enter a value greater than or equal to {0}."),step:d.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){function t(t){var e=void 0!==d(this).attr("contenteditable")&&"false"!==d(this).attr("contenteditable");if(!this.form&&e&&(this.form=d(this).closest("form")[0],this.name=d(this).attr("name")),r===this.form){var i=d.data(this.form,"validator"),s="on"+t.type.replace(/^validate/,""),n=i.settings;n[s]&&!d(this).is(n.ignore)&&n[s].call(i,this,t)}}this.labelContainer=d(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||d(this.currentForm),this.containers=d(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var i,r=this.currentForm,s=this.groups={};d.each(this.settings.groups,function(i,t){"string"==typeof t&&(t=t.split(/\s/)),d.each(t,function(t,e){s[e]=i})}),i=this.settings.rules,d.each(i,function(t,e){i[t]=d.validator.normalizeRule(e)}),d(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",t).on("click.validate","select, option, [type='radio'], [type='checkbox']",t),this.settings.invalidHandler&&d(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),d.extend(this.submitted,this.errorMap),this.invalid=d.extend({},this.errorMap),this.valid()||d(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var t=0,e=this.currentElements=this.elements();e[t];t++)this.check(e[t]);return this.valid()},element:function(t){var e,i,s=this.clean(t),n=this.validationTargetFor(s),r=this,a=!0;return void 0===n?delete this.invalid[s.name]:(this.prepareElement(n),this.currentElements=d(n),(i=this.groups[n.name])&&d.each(this.groups,function(t,e){e===i&&t!==n.name&&((s=r.validationTargetFor(r.clean(r.findByName(t))))&&s.name in r.invalid&&(r.currentElements.push(s),a=r.check(s)&&a))}),e=!1!==this.check(n),a=a&&e,this.invalid[n.name]=!e,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),d(t).attr("aria-invalid",!e)),a},showErrors:function(e){if(e){var i=this;d.extend(this.errorMap,e),this.errorList=d.map(this.errorMap,function(t,e){return{message:t,element:i.findByName(e)[0]}}),this.successList=d.grep(this.successList,function(t){return!(t.name in e)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){d.fn.resetForm&&d(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var t=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(t)},resetElements:function(t){var e;if(this.settings.unhighlight)for(e=0;t[e];e++)this.settings.unhighlight.call(this,t[e],this.settings.errorClass,""),this.findByName(t[e].name).removeClass(this.settings.validClass);else t.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(t){var e,i=0;for(e in t)void 0!==t[e]&&null!==t[e]&&!1!==t[e]&&i++;return i},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(t){t.not(this.containers).text(""),this.addWrapper(t).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{d(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(t){}},findLastActive:function(){var e=this.lastActive;return e&&1===d.grep(this.errorList,function(t){return t.element.name===e.name}).length&&e},elements:function(){var i=this,s={};return d(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var t=this.name||d(this).attr("name"),e=void 0!==d(this).attr("contenteditable")&&"false"!==d(this).attr("contenteditable");return!t&&i.settings.debug&&window.console&&console.error("%o has no name assigned",this),e&&(this.form=d(this).closest("form")[0],this.name=t),!(this.form!==i.currentForm||t in s||!i.objectLength(d(this).rules())||(s[t]=!0,0))})},clean:function(t){return d(t)[0]},errors:function(){var t=this.settings.errorClass.split(" ").join(".");return d(this.settings.errorElement+"."+t,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=d([]),this.toHide=d([])},reset:function(){this.resetInternals(),this.currentElements=d([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(t){this.reset(),this.toHide=this.errorsFor(t)},elementValue:function(t){var e,i,s=d(t),n=t.type,r=void 0!==s.attr("contenteditable")&&"false"!==s.attr("contenteditable");return"radio"===n||"checkbox"===n?this.findByName(t.name).filter(":checked").val():"number"===n&&void 0!==t.validity?t.validity.badInput?"NaN":s.val():(e=r?s.text():s.val(),"file"===n?"C:\\fakepath\\"===e.substr(0,12)?e.substr(12):0<=(i=e.lastIndexOf("/"))?e.substr(i+1):0<=(i=e.lastIndexOf("\\"))?e.substr(i+1):e:"string"==typeof e?e.replace(/\r/g,""):e)},check:function(e){e=this.validationTargetFor(this.clean(e));var t,i,s,n,r=d(e).rules(),a=d.map(r,function(t,e){return e}).length,o=!1,l=this.elementValue(e);for(i in"function"==typeof r.normalizer?n=r.normalizer:"function"==typeof this.settings.normalizer&&(n=this.settings.normalizer),n&&(l=n.call(e,l),delete r.normalizer),r){s={method:i,parameters:r[i]};try{if("dependency-mismatch"===(t=d.validator.methods[i].call(this,l,e,s.parameters))&&1===a){o=!0;continue}if(o=!1,"pending"===t)return void(this.toHide=this.toHide.not(this.errorsFor(e)));if(!t)return this.formatAndAdd(e,s),!1}catch(t){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+e.id+", check the '"+s.method+"' method.",t),t instanceof TypeError&&(t.message+=".  Exception occurred when checking element "+e.id+", check the '"+s.method+"' method."),t}}if(!o)return this.objectLength(r)&&this.successList.push(e),!0},customDataMessage:function(t,e){return d(t).data("msg"+e.charAt(0).toUpperCase()+e.substring(1).toLowerCase())||d(t).data("msg")},customMessage:function(t,e){var i=this.settings.messages[t];return i&&(i.constructor===String?i:i[e])},findDefined:function(){for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t]},defaultMessage:function(t,e){"string"==typeof e&&(e={method:e});var i=this.findDefined(this.customMessage(t.name,e.method),this.customDataMessage(t,e.method),!this.settings.ignoreTitle&&t.title||void 0,d.validator.messages[e.method],"<strong>Warning: No message defined for "+t.name+"</strong>"),s=/\$?\{(\d+)\}/g;return"function"==typeof i?i=i.call(this,e.parameters,t):s.test(i)&&(i=d.validator.format(i.replace(s,"{$1}"),e.parameters)),i},formatAndAdd:function(t,e){var i=this.defaultMessage(t,e);this.errorList.push({message:i,element:t,method:e.method}),this.errorMap[t.name]=i,this.submitted[t.name]=i},addWrapper:function(t){return this.settings.wrapper&&(t=t.add(t.parent(this.settings.wrapper))),t},defaultShowErrors:function(){var t,e,i;for(t=0;this.errorList[t];t++)i=this.errorList[t],this.settings.highlight&&this.settings.highlight.call(this,i.element,this.settings.errorClass,this.settings.validClass),this.showLabel(i.element,i.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(t=0;this.successList[t];t++)this.showLabel(this.successList[t]);if(this.settings.unhighlight)for(t=0,e=this.validElements();e[t];t++)this.settings.unhighlight.call(this,e[t],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return d(this.errorList).map(function(){return this.element})},showLabel:function(t,e){var i,s,n,r,a=this.errorsFor(t),o=this.idOrName(t),l=d(t).attr("aria-describedby");a.length?(a.removeClass(this.settings.validClass).addClass(this.settings.errorClass),a.html(e)):(i=a=d("<"+this.settings.errorElement+">").attr("id",o+"-error").addClass(this.settings.errorClass).html(e||""),this.settings.wrapper&&(i=a.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(i):this.settings.errorPlacement?this.settings.errorPlacement.call(this,i,d(t)):i.insertAfter(t),a.is("label")?a.attr("for",o):0===a.parents("label[for='"+this.escapeCssMeta(o)+"']").length&&(n=a.attr("id"),l?l.match(new RegExp("\\b"+this.escapeCssMeta(n)+"\\b"))||(l+=" "+n):l=n,d(t).attr("aria-describedby",l),(s=this.groups[t.name])&&(r=this,d.each(r.groups,function(t,e){e===s&&d("[name='"+r.escapeCssMeta(t)+"']",r.currentForm).attr("aria-describedby",a.attr("id"))})))),!e&&this.settings.success&&(a.text(""),"string"==typeof this.settings.success?a.addClass(this.settings.success):this.settings.success(a,t)),this.toShow=this.toShow.add(a)},errorsFor:function(t){var e=this.escapeCssMeta(this.idOrName(t)),i=d(t).attr("aria-describedby"),s="label[for='"+e+"'], label[for='"+e+"'] *";return i&&(s=s+", #"+this.escapeCssMeta(i).replace(/\s+/g,", #")),this.errors().filter(s)},escapeCssMeta:function(t){return t.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(t){return this.groups[t.name]||(this.checkable(t)?t.name:t.id||t.name)},validationTargetFor:function(t){return this.checkable(t)&&(t=this.findByName(t.name)),d(t).not(this.settings.ignore)[0]},checkable:function(t){return/radio|checkbox/i.test(t.type)},findByName:function(t){return d(this.currentForm).find("[name='"+this.escapeCssMeta(t)+"']")},getLength:function(t,e){switch(e.nodeName.toLowerCase()){case"select":return d("option:selected",e).length;case"input":if(this.checkable(e))return this.findByName(e.name).filter(":checked").length}return t.length},depend:function(t,e){return!this.dependTypes[typeof t]||this.dependTypes[typeof t](t,e)},dependTypes:{boolean:function(t){return t},string:function(t,e){return!!d(t,e.form).length},function:function(t,e){return t(e)}},optional:function(t){var e=this.elementValue(t);return!d.validator.methods.required.call(this,e,t)&&"dependency-mismatch"},startRequest:function(t){this.pending[t.name]||(this.pendingRequest++,d(t).addClass(this.settings.pendingClass),this.pending[t.name]=!0)},stopRequest:function(t,e){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[t.name],d(t).removeClass(this.settings.pendingClass),e&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(d(this.currentForm).submit(),this.submitButton&&d("input:hidden[name='"+this.submitButton.name+"']",this.currentForm).remove(),this.formSubmitted=!1):!e&&0===this.pendingRequest&&this.formSubmitted&&(d(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(t,e){return e="string"==typeof e&&e||"remote",d.data(t,"previousValue")||d.data(t,"previousValue",{old:null,valid:!0,message:this.defaultMessage(t,{method:e})})},destroy:function(){this.resetForm(),d(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur").find(".validate-lessThan-blur").off(".validate-lessThan").removeClass("validate-lessThan-blur").find(".validate-lessThanEqual-blur").off(".validate-lessThanEqual").removeClass("validate-lessThanEqual-blur").find(".validate-greaterThanEqual-blur").off(".validate-greaterThanEqual").removeClass("validate-greaterThanEqual-blur").find(".validate-greaterThan-blur").off(".validate-greaterThan").removeClass("validate-greaterThan-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(t,e){t.constructor===String?this.classRuleSettings[t]=e:d.extend(this.classRuleSettings,t)},classRules:function(t){var e={},i=d(t).attr("class");return i&&d.each(i.split(" "),function(){this in d.validator.classRuleSettings&&d.extend(e,d.validator.classRuleSettings[this])}),e},normalizeAttributeRule:function(t,e,i,s){/min|max|step/.test(i)&&(null===e||/number|range|text/.test(e))&&(s=Number(s),isNaN(s)&&(s=void 0)),s||0===s?t[i]=s:e===i&&"range"!==e&&(t[i]=!0)},attributeRules:function(t){var e,i,s={},n=d(t),r=t.getAttribute("type");for(e in d.validator.methods)i="required"===e?(""===(i=t.getAttribute(e))&&(i=!0),!!i):n.attr(e),this.normalizeAttributeRule(s,r,e,i);return s.maxlength&&/-1|2147483647|524288/.test(s.maxlength)&&delete s.maxlength,s},dataRules:function(t){var e,i,s={},n=d(t),r=t.getAttribute("type");for(e in d.validator.methods)""===(i=n.data("rule"+e.charAt(0).toUpperCase()+e.substring(1).toLowerCase()))&&(i=!0),this.normalizeAttributeRule(s,r,e,i);return s},staticRules:function(t){var e={},i=d.data(t.form,"validator");return i.settings.rules&&(e=d.validator.normalizeRule(i.settings.rules[t.name])||{}),e},normalizeRules:function(s,n){return d.each(s,function(t,e){if(!1!==e){if(e.param||e.depends){var i=!0;switch(typeof e.depends){case"string":i=!!d(e.depends,n.form).length;break;case"function":i=e.depends.call(n,n)}i?s[t]=void 0===e.param||e.param:(d.data(n.form,"validator").resetElements(d(n)),delete s[t])}}else delete s[t]}),d.each(s,function(t,e){s[t]=d.isFunction(e)&&"normalizer"!==t?e(n):e}),d.each(["minlength","maxlength"],function(){s[this]&&(s[this]=Number(s[this]))}),d.each(["rangelength","range"],function(){var t;s[this]&&(d.isArray(s[this])?s[this]=[Number(s[this][0]),Number(s[this][1])]:"string"==typeof s[this]&&(t=s[this].replace(/[\[\]]/g,"").split(/[\s,]+/),s[this]=[Number(t[0]),Number(t[1])]))}),d.validator.autoCreateRanges&&(null!=s.min&&null!=s.max&&(s.range=[s.min,s.max],delete s.min,delete s.max),null!=s.minlength&&null!=s.maxlength&&(s.rangelength=[s.minlength,s.maxlength],delete s.minlength,delete s.maxlength)),s},normalizeRule:function(t){if("string"==typeof t){var e={};d.each(t.split(/\s/),function(){e[this]=!0}),t=e}return t},addMethod:function(t,e,i){d.validator.methods[t]=e,d.validator.messages[t]=void 0!==i?i:d.validator.messages[t],e.length<3&&d.validator.addClassRules(t,d.validator.normalizeRule(t))},methods:{required:function(t,e,i){if(!this.depend(i,e))return"dependency-mismatch";if("select"!==e.nodeName.toLowerCase())return this.checkable(e)?0<this.getLength(t,e):null!=t&&0<t.length;var s=d(e).val();return s&&0<s.length},email:function(t,e){return this.optional(e)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)},url:function(t,e){return this.optional(e)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(t)},date:(i=!1,function(t,e){return i||(i=!0,this.settings.debug&&window.console&&console.warn("The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`.")),this.optional(e)||!/Invalid|NaN/.test(new Date(t).toString())}),dateISO:function(t,e){return this.optional(e)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(t)},number:function(t,e){return this.optional(e)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)},digits:function(t,e){return this.optional(e)||/^\d+$/.test(t)},minlength:function(t,e,i){var s=d.isArray(t)?t.length:this.getLength(t,e);return this.optional(e)||i<=s},maxlength:function(t,e,i){var s=d.isArray(t)?t.length:this.getLength(t,e);return this.optional(e)||s<=i},rangelength:function(t,e,i){var s=d.isArray(t)?t.length:this.getLength(t,e);return this.optional(e)||s>=i[0]&&s<=i[1]},min:function(t,e,i){return this.optional(e)||i<=t},max:function(t,e,i){return this.optional(e)||t<=i},range:function(t,e,i){return this.optional(e)||t>=i[0]&&t<=i[1]},step:function(t,e,i){var s,n=d(e).attr("type"),r="Step attribute on input type "+n+" is not supported.",a=new RegExp("\\b"+n+"\\b"),o=function(t){var e=(""+t).match(/(?:\.(\d+))?$/);return e&&e[1]?e[1].length:0},l=function(t){return Math.round(t*Math.pow(10,s))},h=!0;if(n&&!a.test(["text","number","range"].join()))throw new Error(r);return s=o(i),(o(t)>s||l(t)%l(i)!=0)&&(h=!1),this.optional(e)||h},equalTo:function(t,e,i){var s=d(i);return this.settings.onfocusout&&s.not(".validate-equalTo-blur").length&&s.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){d(e).valid()}),t===s.val()},remote:function(r,a,t,o){if(this.optional(a))return"dependency-mismatch";o="string"==typeof o&&o||"remote";var l,e,i,h=this.previousValue(a,o);return this.settings.messages[a.name]||(this.settings.messages[a.name]={}),h.originalMessage=h.originalMessage||this.settings.messages[a.name][o],this.settings.messages[a.name][o]=h.message,t="string"==typeof t&&{url:t}||t,i=d.param(d.extend({data:r},t.data)),h.old===i?h.valid:(h.old=i,(l=this).startRequest(a),(e={})[a.name]=r,d.ajax(d.extend(!0,{mode:"abort",port:"validate"+a.name,dataType:"json",data:e,context:l.currentForm,success:function(t){var e,i,s,n=!0===t||"true"===t;l.settings.messages[a.name][o]=h.originalMessage,n?(s=l.formSubmitted,l.resetInternals(),l.toHide=l.errorsFor(a),l.formSubmitted=s,l.successList.push(a),l.invalid[a.name]=!1,l.showErrors()):(e={},i=t||l.defaultMessage(a,{method:o,parameters:r}),e[a.name]=h.message=i,l.invalid[a.name]=!0,l.showErrors(e)),h.valid=n,l.stopRequest(a,n)}},t)),"pending")}}});var s,n={};return d.ajaxPrefilter?d.ajaxPrefilter(function(t,e,i){var s=t.port;"abort"===t.mode&&(n[s]&&n[s].abort(),n[s]=i)}):(s=d.ajax,d.ajax=function(t){var e=("mode"in t?t:d.ajaxSettings).mode,i=("port"in t?t:d.ajaxSettings).port;return"abort"===e?(n[i]&&n[i].abort(),n[i]=s.apply(this,arguments),n[i]):s.apply(this,arguments)}),d});

(function(e){function t(){var e=document.createElement("input"),t="onpaste";return e.setAttribute(t,""),"function"==typeof e[t]?"paste":"input"}var n,a=t()+".mask",r=navigator.userAgent,i=/iphone/i.test(r),o=/android/i.test(r);e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(t,r){var c,l,s,u,f,h;return!t&&this.length>0?(c=e(this[0]),c.data(e.mask.dataName)()):(r=e.extend({placeholder:e.mask.placeholder,completed:null},r),l=e.mask.definitions,s=[],u=h=t.length,f=null,e.each(t.split(""),function(e,t){"?"==t?(h--,u=e):l[t]?(s.push(RegExp(l[t])),null===f&&(f=s.length-1)):s.push(null)}),this.trigger("unmask").each(function(){function c(e){for(;h>++e&&!s[e];);return e}function d(e){for(;--e>=0&&!s[e];);return e}function m(e,t){var n,a;if(!(0>e)){for(n=e,a=c(t);h>n;n++)if(s[n]){if(!(h>a&&s[n].test(R[a])))break;R[n]=R[a],R[a]=r.placeholder,a=c(a)}b(),x.caret(Math.max(f,e))}}function p(e){var t,n,a,i;for(t=e,n=r.placeholder;h>t;t++)if(s[t]){if(a=c(t),i=R[t],R[t]=n,!(h>a&&s[a].test(i)))break;n=i}}function g(e){var t,n,a,r=e.which;8===r||46===r||i&&127===r?(t=x.caret(),n=t.begin,a=t.end,0===a-n&&(n=46!==r?d(n):a=c(n-1),a=46===r?c(a):a),k(n,a),m(n,a-1),e.preventDefault()):27==r&&(x.val(S),x.caret(0,y()),e.preventDefault())}function v(t){var n,a,i,l=t.which,u=x.caret();t.ctrlKey||t.altKey||t.metaKey||32>l||l&&(0!==u.end-u.begin&&(k(u.begin,u.end),m(u.begin,u.end-1)),n=c(u.begin-1),h>n&&(a=String.fromCharCode(l),s[n].test(a)&&(p(n),R[n]=a,b(),i=c(n),o?setTimeout(e.proxy(e.fn.caret,x,i),0):x.caret(i),r.completed&&i>=h&&r.completed.call(x))),t.preventDefault())}function k(e,t){var n;for(n=e;t>n&&h>n;n++)s[n]&&(R[n]=r.placeholder)}function b(){x.val(R.join(""))}function y(e){var t,n,a=x.val(),i=-1;for(t=0,pos=0;h>t;t++)if(s[t]){for(R[t]=r.placeholder;pos++<a.length;)if(n=a.charAt(pos-1),s[t].test(n)){R[t]=n,i=t;break}if(pos>a.length)break}else R[t]===a.charAt(pos)&&t!==u&&(pos++,i=t);return e?b():u>i+1?(x.val(""),k(0,h)):(b(),x.val(x.val().substring(0,i+1))),u?t:f}var x=e(this),R=e.map(t.split(""),function(e){return"?"!=e?l[e]?r.placeholder:e:void 0}),S=x.val();x.data(e.mask.dataName,function(){return e.map(R,function(e,t){return s[t]&&e!=r.placeholder?e:null}).join("")}),x.attr("readonly")||x.one("unmask",function(){x.unbind(".mask").removeData(e.mask.dataName)}).bind("focus.mask",function(){clearTimeout(n);var e;S=x.val(),e=y(),n=setTimeout(function(){b(),e==t.length?x.caret(0,e):x.caret(e)},10)}).bind("blur.mask",function(){y(),x.val()!=S&&x.change()}).bind("keydown.mask",g).bind("keypress.mask",v).bind(a,function(){setTimeout(function(){var e=y(!0);x.caret(e),r.completed&&e==x.val().length&&r.completed.call(x)},0)}),y()}))}})})(jQuery);

!function(e,t){if("function"==typeof define&&define.amd)define(["module","exports"],t);else if("undefined"!=typeof exports)t(module,exports);else{var n={exports:{}};t(n,n.exports),e.WOW=n.exports}}(this,function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){return 0<=t.indexOf(e)}function i(e,t,n){null!=e.addEventListener?e.addEventListener(t,n,!1):null!=e.attachEvent?e.attachEvent("on"+t,n):e[t]=n}function s(e,t,n){null!=e.removeEventListener?e.removeEventListener(t,n,!1):null!=e.detachEvent?e.detachEvent("on"+t,n):delete e[t]}Object.defineProperty(t,"__esModule",{value:!0});var a,r,l=function(){function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}}(),u=window.WeakMap||window.MozWeakMap||function(){function e(){n(this,e),this.keys=[],this.values=[]}return l(e,[{key:"get",value:function(e){for(var t=0;t<this.keys.length;t++)if(this.keys[t]===e)return this.values[t]}},{key:"set",value:function(e,t){for(var n=0;n<this.keys.length;n++)if(this.keys[n]===e)return this.values[n]=t,this;return this.keys.push(e),this.values.push(t),this}}]),e}(),c=window.MutationObserver||window.WebkitMutationObserver||window.MozMutationObserver||(r=a=function(){function e(){n(this,e),"undefined"!=typeof console&&null!==console&&(console.warn("MutationObserver is not supported by your browser."),console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content."))}return l(e,[{key:"observe",value:function(){}}]),e}(),a.notSupported=!0,r),h=window.getComputedStyle||function(n){var i=/(\-([a-z]){1})/g;return{getPropertyValue:function(e){"float"===e&&(e="styleFloat"),i.test(e)&&e.replace(i,function(e,t){return t.toUpperCase()});var t=n.currentStyle;return(null!=t?t[e]:void 0)||null}}},d=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];n(this,t),this.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null,scrollContainer:null,resetAnimation:!0},this.animate="requestAnimationFrame"in window?function(e){return window.requestAnimationFrame(e)}:function(e){return e()},this.vendors=["moz","webkit"],this.start=this.start.bind(this),this.resetAnimation=this.resetAnimation.bind(this),this.scrollHandler=this.scrollHandler.bind(this),this.scrollCallback=this.scrollCallback.bind(this),this.scrolled=!0,this.config=function(e,t){for(var n in t)if(null==e[n]){var i=t[n];e[n]=i}return e}(e,this.defaults),null!=e.scrollContainer&&(this.config.scrollContainer=document.querySelector(e.scrollContainer)),this.animationNameCache=new u,this.wowEvent=function(e){var t=!(arguments.length<=1||void 0===arguments[1])&&arguments[1],n=!(arguments.length<=2||void 0===arguments[2])&&arguments[2],i=arguments.length<=3||void 0===arguments[3]?null:arguments[3],o=void 0;return null!=document.createEvent?(o=document.createEvent("CustomEvent")).initCustomEvent(e,t,n,i):null!=document.createEventObject?(o=document.createEventObject()).eventType=e:o.eventName=e,o}(this.config.boxClass)}return l(t,[{key:"init",value:function(){this.element=window.document.documentElement,o(document.readyState,["interactive","complete"])?this.start():i(document,"DOMContentLoaded",this.start),this.finished=[]}},{key:"start",value:function(){var s=this;if(this.stopped=!1,this.boxes=[].slice.call(this.element.querySelectorAll("."+this.config.boxClass)),this.all=this.boxes.slice(0),this.boxes.length)if(this.disabled())this.resetStyle();else for(var e=0;e<this.boxes.length;e++){var t=this.boxes[e];this.applyStyle(t,!0)}this.disabled()||(i(this.config.scrollContainer||window,"scroll",this.scrollHandler),i(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live&&new c(function(e){for(var t=0;t<e.length;t++)for(var n=e[t],i=0;i<n.addedNodes.length;i++){var o=n.addedNodes[i];s.doSync(o)}}).observe(document.body,{childList:!0,subtree:!0})}},{key:"stop",value:function(){this.stopped=!0,s(this.config.scrollContainer||window,"scroll",this.scrollHandler),s(window,"resize",this.scrollHandler),null!=this.interval&&clearInterval(this.interval)}},{key:"sync",value:function(){c.notSupported&&this.doSync(this.element)}},{key:"doSync",value:function(e){if(null!=e||(e=this.element),1===e.nodeType)for(var t=(e=e.parentNode||e).querySelectorAll("."+this.config.boxClass),n=0;n<t.length;n++){var i=t[n];o(i,this.all)||(this.boxes.push(i),this.all.push(i),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(i,!0),this.scrolled=!0)}}},{key:"show",value:function(e){return this.applyStyle(e),e.className=e.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(e),t=e,n=this.wowEvent,null!=t.dispatchEvent?t.dispatchEvent(n):n in(null!=t)?t[n]():"on"+n in(null!=t)&&t["on"+n](),this.config.resetAnimation&&(i(e,"animationend",this.resetAnimation),i(e,"oanimationend",this.resetAnimation),i(e,"webkitAnimationEnd",this.resetAnimation),i(e,"MSAnimationEnd",this.resetAnimation)),e;var t,n}},{key:"applyStyle",value:function(e,t){var n=this,i=e.getAttribute("data-wow-duration"),o=e.getAttribute("data-wow-delay"),s=e.getAttribute("data-wow-iteration");return this.animate(function(){return n.customStyle(e,t,i,o,s)})}},{key:"resetStyle",value:function(){for(var e=0;e<this.boxes.length;e++)this.boxes[e].style.visibility="visible"}},{key:"resetAnimation",value:function(e){if(0<=e.type.toLowerCase().indexOf("animationend")){var t=e.target||e.srcElement;t.className=t.className.replace(this.config.animateClass,"").trim()}}},{key:"customStyle",value:function(e,t,n,i,o){return t&&this.cacheAnimationName(e),e.style.visibility=t?"hidden":"visible",n&&this.vendorSet(e.style,{animationDuration:n}),i&&this.vendorSet(e.style,{animationDelay:i}),o&&this.vendorSet(e.style,{animationIterationCount:o}),this.vendorSet(e.style,{animationName:t?"none":this.cachedAnimationName(e)}),e}},{key:"vendorSet",value:function(e,t){for(var n in t)if(t.hasOwnProperty(n)){var i=t[n];e[""+n]=i;for(var o=0;o<this.vendors.length;o++)e[""+this.vendors[o]+n.charAt(0).toUpperCase()+n.substr(1)]=i}}},{key:"vendorCSS",value:function(e,t){for(var n=h(e),i=n.getPropertyCSSValue(t),o=0;o<this.vendors.length;o++){var s=this.vendors[o];i=i||n.getPropertyCSSValue("-"+s+"-"+t)}return i}},{key:"animationName",value:function(t){var n=void 0;try{n=this.vendorCSS(t,"animation-name").cssText}catch(e){n=h(t).getPropertyValue("animation-name")}return"none"===n?"":n}},{key:"cacheAnimationName",value:function(e){return this.animationNameCache.set(e,this.animationName(e))}},{key:"cachedAnimationName",value:function(e){return this.animationNameCache.get(e)}},{key:"scrollHandler",value:function(){this.scrolled=!0}},{key:"scrollCallback",value:function(){if(this.scrolled){this.scrolled=!1;for(var e=[],t=0;t<this.boxes.length;t++){var n=this.boxes[t];if(n){if(this.isVisible(n)){this.show(n);continue}e.push(n)}}this.boxes=e,this.boxes.length||this.config.live||this.stop()}}},{key:"offsetTop",value:function(e){for(;void 0===e.offsetTop;)e=e.parentNode;for(var t=e.offsetTop;e.offsetParent;)t+=(e=e.offsetParent).offsetTop;return t}},{key:"isVisible",value:function(e){var t=e.getAttribute("data-wow-offset")||this.config.offset,n=this.config.scrollContainer&&this.config.scrollContainer.scrollTop||window.pageYOffset,i=n+Math.min(this.element.clientHeight,"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight)-t,o=this.offsetTop(e),s=o+e.clientHeight;return o<=i&&n<=s}},{key:"disabled",value:function(){return!this.config.mobile&&(e=navigator.userAgent,/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e));var e}}]),t}();t.default=d,e.exports=t.default});

$(document).ready(function () {
   
    $('.burger').click(function () {
        if ($(this).next('.header-nav').css('display') == 'none') {
            $(this).next('.header-nav').slideDown();
            $('.burger').addClass('burger-open');
        } 
        else {
            $('.burger').removeClass('burger-open');
            $(this).next('.header-nav').slideUp();
        }
    });

    $('#main-form').validate({
        rules: {
            user_name: {
                required: true
            },
            user_phone: {
                required: true
            },
            user_email: {
                required: true
            }
        },
        messages: {
            user_name: {
                required: "Заполните пожалуйста поле"
            },
            user_phone: {
                required: "Заполните пожалуйста поле"
            },
            user_email: {
                required: "Заполните пожалуйста поле"
            }
        }
    });

    $('.phone').mask('+7 (999) 999-99-99');

    $('.header-nav__link').click(function () {
        var el = $(this).attr('href');
        $('html,body').animate({
            scrollTop: $(el).offset().top
        }, 2000);
        return false;
    });

    new WOW().init();
    $(window).width(function () {
        $(window).width() < 800 && ($(".wow").removeClass("wow"), 
        $(".fadeInUp").removeClass("fadeInUp"))
    });

});
