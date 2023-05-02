!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports,require("dexie"),require("react")):"function"==typeof define&&define.amd?define(["exports","dexie","react"],r):r((e="undefined"!=typeof globalThis?globalThis:e||self).DexieReactHooks={},e.Dexie,e.React)}(this,(function(e,r,n){"use strict";function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=t(n);function u(e,r,n){var t,u;"function"==typeof e?(t=r||[],u=n):(t=[],u=r);var i=o.default.useRef({hasResult:!1,result:u,error:null}),s=o.default.useReducer((function(e){return e+1}),0);s[0];var a=s[1],f=o.default.useMemo((function(){var r="function"==typeof e?e():e;if(!r||"function"!=typeof r.subscribe)throw e===r?new TypeError("Given argument to useObservable() was neither a valid observable nor a function."):new TypeError("Observable factory given to useObservable() did not return a valid observable.");if(!i.current.hasResult&&"undefined"!=typeof window)if("function"==typeof r.getValue)i.current.result=r.getValue(),i.current.hasResult=!0;else{var n=r.subscribe((function(e){i.current.result=e,i.current.hasResult=!0}));"function"==typeof n?n():n.unsubscribe()}return r}),t);if(o.default.useDebugValue(i.current.result),o.default.useEffect((function(){var e=f.subscribe((function(e){var r=i.current;null===r.error&&r.result===e||(r.error=null,r.result=e,r.hasResult=!0,a())}),(function(e){var r=i.current;r.error!==e&&(r.error=e,a())}));return"function"==typeof e?e:e.unsubscribe.bind(e)}),t),i.current.error)throw i.current.error;return i.current.result}e.useLiveQuery=function(e,n,t){return u((function(){return r.liveQuery(e)}),n||[],t)},e.useObservable=u,e.usePermissions=function(e,n,t){if(!e)throw new TypeError("Invalid arguments to usePermissions(): undefined or null");var o;if(arguments.length>=3){if(!("transaction"in e))throw new TypeError("Invalid arguments to usePermission(db, table, obj): 1st arg must be a Dexie instance");if("string"!=typeof n)throw new TypeError("Invalid arguments to usePermission(db, table, obj): 2nd arg must be string");if(!t||"object"!=typeof t)throw new TypeError("Invalid arguments to usePermission(db, table, obj): 3rd arg must be an object");o=e}else{if(e instanceof r.Dexie)throw new TypeError("Invalid arguments to usePermission(db, table, obj): Missing table and obj arguments.");if("function"!=typeof e.table||"object"!=typeof e.db)throw new TypeError("Invalid arguments to usePermissions(). Expected usePermissions(entity: DexieCloudEntity) or usePermissions(db: Dexie, table: string, obj: DexieCloudObject)");o=e.db,t=e,n=e.table()}if(!("cloud"in o))throw new Error("usePermissions() is only for Dexie Cloud but there's no dexie-cloud-addon active in given db.");if(!("permissions"in o.cloud))throw new Error("usePermissions() requires a newer version of dexie-cloud-addon. Please upgrade it.");return u((function(){return o.cloud.permissions(t,n)}),[t.realmId,t.owner,n])},Object.defineProperty(e,"__esModule",{value:!0})}));