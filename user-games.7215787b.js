function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},t={},o=n.parcelRequire752b;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in t){var n=t[e];delete t[e];var o={id:e,exports:{}};return r[e]=o,n.call(o.exports,o,o.exports),o.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,n){t[e]=n},n.parcelRequire752b=o);var l=e(o("c1JL1")).template({1:function(e,n,r,t,o){var l=e.lambda,a=e.escapeExpression;return'<div class="fb">\n    <input type="checkbox" name="game_ganres" value="'+a(l(n,n))+'">\n    <span>'+a(l(n,n))+"</span>\n</div>\n"},compiler:[8,">= 4.3.0"],main:function(e,n,r,t,o){var l;return"<label>Ganres</label>\n"+(null!=(l=(e.lookupProperty||function(e,n){if(Object.prototype.hasOwnProperty.call(e,n))return e[n]})(r,"each").call(null!=n?n:e.nullContext||{},n,{name:"each",hash:{},fn:e.program(1,o,0),inverse:e.noop,data:o,loc:{start:{line:2,column:0},end:{line:7,column:9}}}))?l:"")},useData:!0});const a=["Action","Adventure","RPG","Shooters","Strategies","Survival","Action"];document.querySelector(".js-ganres-list").innerHTML=l(a);
//# sourceMappingURL=user-games.7215787b.js.map