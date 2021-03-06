import crc32 from 'crc32';
import leftPad from 'left-pad';

let words=['aggregator','agile','churn','fatigue','buzzword','benchmark','backend','beta','bigdata','bleedingedge','blogosphere','clickbait','cloud','canvas','cloudscale','scope','analytics','cms','unicode','crossplatform','synergy','leftpad','datafication','datamining','emoji','datavis','deepdive','deepweb','designpattern','devops','digitaldivide','xml','drm','digitalsignage','disruptivetech','jsx','dotbomb','npm','elearning','bigdata','engine','refactor','enterprise','servicebus','evolution','framework','css','fuzzylogic','trend','html','immersion','router','internetofthings','innovation','mashup','microservices','mobile','module','service','nanotech','netiquette','nextgen','objectoriented','functional','omnichannel','bitcoin','parser','paas','podcasting','portal','realtime','responsive','dotio','saas','scalability','skeuomorphic','social','transpile','minify','spam','struts','syncup','lifecycle','tagging','seo','thoughtleader','sprint','ui','ux','github','viral','virtualize','vlogging','vortal','malware','webinar','weblog','webservices','wikiality','workflow','webscale','es6','babel','gulp','recursion','emscripten','webassembly','eslint','webpack','dojotoolkit','jquery','midori','polyfill','hax','react','yui','anychart','d3','highcharts','easeljs','component','p5','pixi','plotly','processing','raphael','bluebird','webgl','velocity','whitestormjs','extjs','angularjs','bootstrap','dhtml','dojowidgets','foundation','polymer','jqueryui','jqwidgets','igniteui','kendoui','api','wijmo5','openui5','qooxdoo','smartclient','browserify','coffeescript','vue','amplesdk','glow','livelykernel','script','typescript','googleclosure','joose','jsphp','mochikit','pdf','rico','websockets','redux','lodash','underscore','cascade','handlebars','async','mustache','jasmine','mocha','qunit','unit','databind','backbone','cappuccino','chaplin','echo','ember','enyo','webkit','mvc','knockout','meteor','mojito','mootools','nodejs','prototype','cycle','sproutcore','strategic','abstract','arguments','boolean','break','byte','case','catch','char','class','const','continue','debugger','default','delete','promise','double','else','enum','eval','export','extends','false','final','finally','float','for','function','goto','if','implements','import','in','instanceof','int','interface','let','long','native','new','null','package','private','protected','public','return','short','static','super','switch','concurrent','this','throw','throws','transient','true','try','typeof','var','void','volatile','while','with','yield','mozilla','google','ajax'];

export function getHash(value) {

    let hexHash = crc32(value);

    hexHash = leftPad(hexHash, 8, 0);

    return hexHash
        .match(/../g)
        .map(hex => words[parseInt(hex, 16)])
        .join('-');
}