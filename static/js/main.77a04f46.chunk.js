(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{134:function(e,t,a){e.exports=a(260)},145:function(e){e.exports={}},260:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(26),l=a.n(o),c=(a(261),a(15)),i=a.n(c),s=a(34),u=a(14),m=(a(141),a(21)),h=a(111),d=a(121),g=h.a,f=Object(m.a)(d,["geoPath"]),p=Object(n.createContext)(),b=function(e){var t=e.width,a=e.height,o=e.offsetX,l=e.offsetY,c=e.projection,i=e.projectionConfig,s=Object(m.a)(e,["width","height","offsetX","offsetY","projection","projectionConfig"]),h=i.center||[],d=Object(u.a)(h,2),b=d[0],E=d[1],y=i.rotate||[],v=Object(u.a)(y,3),C=v[0],j=v[1],w=v[2],O=i.parallels||[],S=Object(u.a)(O,2),A=S[0],H=S[1],M=i.scale||null,x=Object(n.useMemo)(function(){return function(e){var t=e.projectionConfig,a=void 0===t?{}:t,n=e.projection,r=void 0===n?"geoEqualEarth":n,o=e.width,l=void 0===o?800:o,c=e.height,i=void 0===c?600:c,s=e.offsetX,u=void 0===s?0:s,m=e.offsetY,h=void 0===m?0:m;if("function"===typeof r)return r;var d=a.scale||null,g=f[r]().translate([l/2+u*d/1e3,i+h*d/1e3]).rotate([82+10/60,-30]).scale(100);return[g.center?"center":null,g.rotate?"rotate":null,g.scale?"scale":null,g.parallels?"parallels":null].forEach(function(e){e&&(g=g[e](a[e]||g[e]()))}),g}({projectionConfig:{center:b||0===b||E||0===E?[b,E]:null,rotate:C||0===C||j||0===j?[C,j,w]:null,parallels:A||0===A||H||0===H?[A,H]:null,scale:M},projection:c,width:t,height:a,offsetX:o,offsetY:l})},[t,a,c,b,E,C,j,w,A,H,M,o,l]),T=Object(n.useCallback)(x,[x]),k=Object(n.useMemo)(function(){return{width:t,height:a,projection:T,path:g().projection(T)}},[t,a,T]);return r.a.createElement(p.Provider,Object.assign({value:k},s))},E=a(28),y=a(122);function v(e,t){if(Array.isArray(e))return t?t(e):e;var a=Object(y.a)(e,e.objects[Object.keys(e.objects)[0]]).features;return console.log(e.objects[Object.keys(e.objects)[0]]),t?t(a):a}function C(e){var t=e.geography,a=e.parseGeographies,r=Object(n.useContext)(p).path,o=Object(n.useState)(),l=Object(u.a)(o,2),c=l[0],i=l[1];return Object(n.useEffect)(function(){var e;"undefined"!==typeof window&&("string"===typeof t?(e=t,fetch(e).then(function(e){if(!e.ok)throw Error(e.statusText);return e.json()}).catch(function(e){console.log("There was a problem when fetching the data: ",e)})).then(function(e){e&&i(v(e,a))}):i(v(t,a)))},[t,a]),{geographies:Object(n.useMemo)(function(){return function(e,t){return e?e.map(function(e,a){return Object(E.a)({},e,{rsmKey:"geo-".concat(a),svgPath:t(e)})}):[]}(c,r)},[c,r])}}var j=function(e){var t=e.geography,a=e.children,o=e.parseGeographies,l=e.className,c=void 0===l?"":l,i=Object(m.a)(e,["geography","children","parseGeographies","className"]),s=Object(n.useContext)(p),u=s.path,h=s.projection,d=C({geography:t,parseGeographies:o}).geographies;return r.a.createElement("g",Object.assign({className:"rsm-geographies ".concat(c),height:100},i),d&&d.length>0&&a({geographies:d,path:u,projection:h}))},w=Object(n.memo)(function(e){var t=e.geography,a=e.onMouseEnter,o=e.onMouseLeave,l=e.onMouseDown,c=e.onMouseUp,i=e.onFocus,s=e.onBlur,h=e.style,d=void 0===h?{}:h,g=e.className,f=void 0===g?"":g,p=Object(m.a)(e,["geography","onMouseEnter","onMouseLeave","onMouseDown","onMouseUp","onFocus","onBlur","style","className"]),b=Object(n.useState)(!1),E=Object(u.a)(b,2),y=E[0],v=E[1],C=Object(n.useState)(!1),j=Object(u.a)(C,2),w=j[0],O=j[1];return r.a.createElement("path",Object.assign({tabIndex:"0",className:"rsm-geography ".concat(f),d:t.svgPath,onMouseEnter:function(e){O(!0),a&&a(e)},onMouseLeave:function(e){O(!1),y&&v(!1),o&&o(e)},onFocus:function(e){O(!0),i&&i(e)},onBlur:function(e){O(!1),y&&v(!1),s&&s(e)},onMouseDown:function(e){v(!0),l&&l(e)},onMouseUp:function(e){v(!1),c&&c(e)},style:d[y||w?y?"pressed":"hover":"default"]},p))}),O=function(e){var t=e.width,a=void 0===t?800:t,n=e.height,o=void 0===n?600:n,l=e.offsetX,c=void 0===l?0:l,i=e.offsetY,s=void 0===i?0:i,u=e.projection,h=void 0===u?"geoEqualEarth":u,d=e.projectionConfig,g=void 0===d?{}:d,f=e.className,p=void 0===f?"":f,E=Object(m.a)(e,["width","height","offsetX","offsetY","projection","projectionConfig","className"]);return r.a.createElement(b,{width:a,height:o,offsetX:c,offsetY:s,projection:h,projectionConfig:g},r.a.createElement("svg",Object.assign({width:a,height:o,className:"rsm-svg ".concat(p)},E)))},S=(a(145),r.a.createContext());function A(){var e=r.a.useContext(S);if(!e)throw new Error("useGADM must be used within a GADMProvider");return e}function H(e){var t=r.a.useState({selectedVariable:{varName:"percentDiabetes",printName:"% with Diabetes"},selectedCounty:{NAME:"Fulton",GEOID:"13121"}}),a=Object(u.a)(t,2),n=a[0],o=a[1],l=function(e){o(Object(E.a)({},n,e))},c=r.a.useMemo(function(){return{selectedVariable:n.selectedVariable,selectedCounty:n.selectedCounty,actions:{handlePageStateChange:l}}},[n]);return r.a.createElement(S.Provider,{value:c},e.children)}var M="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/GA-13-georgia-counties.json";function x(e){var t=A(),a=(t.selectedVariable,t.selectedCounty,t.actions.handlePageStateChange);return r.a.createElement("div",null,r.a.createElement(O,{projection:"geoTransverseMercator","data-tip":"",width:760,height:580,strokeWidth:.5,stroke:"black",projectionConfig:{scale:6e3}},r.a.createElement(j,{geography:M},function(e){var t=e.geographies;return r.a.createElement("svg",null,t.map(function(e){return r.a.createElement(w,{key:e.rsmKey,geography:e,onClick:function(){},onMouseEnter:function(){a({selectedCounty:e.properties})},onMouseLeave:function(){},fill:"#FFFFFF"})}))})))}var T=a(271),k=a(273),I=a(274),P=a(268),L=a(272),D=a(269),R=a(24),N=R.c.hasAppClient("test-owzgf")?R.c.getAppClient("test-owzgf"):R.c.initializeAppClient("test-owzgf"),W=N.getServiceClient(R.b.factory,"mongodb-atlas").db("healthequity").collection("gatech");function F(e){var t=e.subgroup,a=e.categories,o=Object(n.useState)([]),l=Object(u.a)(o,2),c=l[0],m=l[1],h=A(),d=h.selectedVariable,g=h.selectedCounty,f=(h.actions.handlePageStateChange,function(){var e=Object(s.a)(i.a.mark(function e(){var a,n,r,o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],n={subgroup:t,county:g.NAME+" County"},e.next=4,W.find(n,{projection:{value:1}}).toArray();case 4:for(o in r=e.sent)a.push(r[o].value);m(a);case 7:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}());Object(n.useEffect)(function(){f()},[d,g,t]);var p=a.map(function(e,t){return r.a.createElement(T.a.Row,{key:e.toString()},r.a.createElement(T.a.Cell,null,e),r.a.createElement(T.a.Cell,null,c[t]),r.a.createElement(T.a.Cell,null,".."))});return r.a.createElement(T.a.Body,null,p)}function V(){var e=A(),t=(e.selectedVariable,e.selectedCounty),a=(e.actions.handlePageStateChange,Object(n.useState)([])),o=Object(u.a)(a,2);o[0],o[1];return r.a.createElement(k.a,null,r.a.createElement(k.a.Row,null,r.a.createElement(k.a.Column,null,r.a.createElement(I.a,{as:"h3",style:{fontWeight:300}},"Statistics of ",t.NAME,r.a.createElement(I.a.Subheader,{style:{fontWeight:300}},"The tables below show diabetes-related health determinants of the ",t.NAME," county.")))),r.a.createElement(k.a.Row,{columns:2},r.a.createElement(k.a.Column,{textAlign:"left"},r.a.createElement(I.a,{as:"h4",style:{fontWeight:300}},"1. Demographic Composition"),r.a.createElement(T.a,{selectable:!0,basic:"very",size:"small"},r.a.createElement(T.a.Header,null,r.a.createElement(T.a.Row,null,r.a.createElement(T.a.HeaderCell,{style:{borderTop:0}},"Variable"),r.a.createElement(T.a.HeaderCell,{style:{borderTop:0}},"County Stat"),r.a.createElement(T.a.HeaderCell,{style:{borderTop:0}},"State Stat"))),r.a.createElement(F,{subgroup:"Demographic Composition",categories:["65 years or older","African American","Asian","Foreign born","Hispanic","Median age","Total Population","Women"]}))),r.a.createElement(k.a.Column,{textAlign:"left"},r.a.createElement(I.a,{as:"h4",style:{fontWeight:300}},"2. Cardiometabolic Disease Morbidity"),r.a.createElement(T.a,{selectable:!0,basic:"very",size:"small"},r.a.createElement(T.a.Header,null,r.a.createElement(T.a.Row,null,r.a.createElement(T.a.HeaderCell,{style:{borderTop:0}},"Variable"),r.a.createElement(T.a.HeaderCell,{style:{borderTop:0}},"County Stat"),r.a.createElement(T.a.HeaderCell,{style:{borderTop:0}},"State Stat"))),r.a.createElement(F,{subgroup:"Cardiometabolic disease morbidity",categories:["CHD Prevalence","Diabetes Prevalence","Hypertension Prevalence","Newly diagnosed diabetes","Obesity Prevalence"]})))),r.a.createElement(k.a.Row,{columns:2},r.a.createElement(k.a.Column,{textAlign:"left"},r.a.createElement(I.a,{as:"h4",style:{fontWeight:300}},"3. Clinical Events"),r.a.createElement(T.a,{selectable:!0,basic:"very",size:"small"},r.a.createElement(T.a.Header,null,r.a.createElement(T.a.Row,null,r.a.createElement(T.a.HeaderCell,{style:{borderTop:0}},"Variable"),r.a.createElement(T.a.HeaderCell,{style:{borderTop:0}},"County Stat"),r.a.createElement(T.a.HeaderCell,{style:{borderTop:0}},"State Stat"))),r.a.createElement(F,{subgroup:"Clinical Events",categories:[]}))),r.a.createElement(k.a.Column,{textAlign:"left"},r.a.createElement(I.a,{as:"h4",style:{fontWeight:300}},"4. Lifestyle Related Risk Factors"),r.a.createElement(T.a,{selectable:!0,basic:"very",size:"small"},r.a.createElement(T.a.Header,null,r.a.createElement(T.a.Row,null,r.a.createElement(T.a.HeaderCell,{style:{borderTop:0}},"Variable"),r.a.createElement(T.a.HeaderCell,{style:{borderTop:0}},"County Stat"),r.a.createElement(T.a.HeaderCell,{style:{borderTop:0}},"State Stat"))),r.a.createElement(F,{subgroup:"Lifestyle Related Risk Factors",categories:["Alcohol Consumption","Physical Inactivity","Sleep","Smoking"]})))),r.a.createElement(k.a.Row,{columns:2},r.a.createElement(k.a.Column,{textAlign:"left"},r.a.createElement(I.a,{as:"h4",style:{fontWeight:300}},"5. Health Care"),r.a.createElement(T.a,{selectable:!0,basic:"very",size:"small"},r.a.createElement(T.a.Header,null,r.a.createElement(T.a.Row,null,r.a.createElement(T.a.HeaderCell,{style:{borderTop:0}},"Variable"),r.a.createElement(T.a.HeaderCell,{style:{borderTop:0}},"County Stat"),r.a.createElement(T.a.HeaderCell,{style:{borderTop:0}},"State Stat"))),r.a.createElement(F,{subgroup:"Healthcare",categories:["% Diabetes in Medicaid Population","Cardiologists","Endocrinologists","Primary Care Doctors","Uninsured"]}))),r.a.createElement(k.a.Column,{textAlign:"left"},r.a.createElement(I.a,{as:"h4",style:{fontWeight:300}},"6. Socioeconomic Factors"),r.a.createElement(T.a,{selectable:!0,basic:"very",size:"small"},r.a.createElement(T.a.Header,null,r.a.createElement(T.a.Row,null,r.a.createElement(T.a.HeaderCell,{style:{borderTop:0}},"Variable"),r.a.createElement(T.a.HeaderCell,{style:{borderTop:0}},"County Stat"),r.a.createElement(T.a.HeaderCell,{style:{borderTop:0}},"State Stat"))),r.a.createElement(F,{subgroup:"Socioeconomic Factors",categories:["Graduates High School in 4 Years","In Poverty","Income Inequality","Median Income (2015)","Unemployed"]})))))}function G(){var e=A(),t=e.selectedVariable;e.selectedCounty,e.actions.handlePageStateChange;return r.a.createElement(k.a,null,r.a.createElement(k.a.Row,null,r.a.createElement(k.a.Column,null,r.a.createElement(I.a,{as:"h3",style:{fontWeight:300}},t.printName,r.a.createElement(I.a.Subheader,{style:{fontWeight:300}},"The color on the map shows the ",t.printName," of the Georgia Counties.")))),r.a.createElement(k.a.Row,null,r.a.createElement(k.a.Column,null,r.a.createElement(x,null))))}function U(){return r.a.createElement(H,null,r.a.createElement(P.a,null,r.a.createElement(k.a,{style:{paddingTop:"2em"}},r.a.createElement(k.a.Row,{columns:1},r.a.createElement(k.a.Column,{textAlign:"center"},r.a.createElement(I.a,{as:"h1",style:{fontWeight:300}},"Georgia Diabetes Data Poral",r.a.createElement(I.a.Subheader,{style:{fontWeight:300}},"Interactive Dashboard of Diabetes-related Health Determinants")),r.a.createElement(I.a,{as:"h4",style:{fontWeight:300}},"A Quick User Guide"),r.a.createElement(L.a,{bulleted:!0,style:{fontWeight:300},size:"mini"},r.a.createElement(L.a.Item,null,"Click on a county on the map located ",r.a.createElement("i",null,"(on the left)")," ",r.a.createElement("br",null),"to see its full statistics on the table ",r.a.createElement("i",null,"(on the right)"),"."),r.a.createElement(L.a.Item,null,"Click on a variable on the table located ",r.a.createElement("i",null,"(on the right)")," ",r.a.createElement("br",null),"to see the county-level distribution on the map ",r.a.createElement("i",null,"(on the left)"),".")))),r.a.createElement(D.a,null),r.a.createElement(k.a.Row,{columns:2},r.a.createElement(k.a.Column,{width:8,textAlign:"center"},r.a.createElement(G,null)),r.a.createElement(k.a.Column,{width:8,textAlign:"center"},r.a.createElement(V,null))))))}function z(){var e=new R.a;return N.auth.loginWithCredential(e)}function Y(){return N.auth.isLoggedIn?N.auth.user:null}function X(){var e=Y();return N.auth.logoutUserWithId(e.id)}var B=r.a.createContext();function q(e){var t=r.a.useState({isLoggedIn:N.auth.isLoggedIn,currentUser:Y()}),a=Object(u.a)(t,2),n=a[0],o=a[1],l=function(){var e=Object(s.a)(i.a.mark(function e(){var t;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n.isLoggedIn){e.next=6;break}return e.next=4,z();case 4:t=e.sent,o(Object(E.a)({},n,{isLoggedIn:!0,currentUser:t}));case 6:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),c=function(){var e=Object(s.a)(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.isLoggedIn){e.next=7;break}return e.next=4,X();case 4:o(Object(E.a)({},n,{isLoggedIn:!1,currentUser:null})),e.next=8;break;case 7:console.log("can't handleLogout when no user is logged in");case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),m=r.a.useMemo(function(){return{isLoggedIn:n.isLoggedIn,currentUser:n.currentUser,actions:{handleAnonymousLogin:l,handleLogout:c}}},[n.isLoggedIn]);return r.a.createElement(B.Provider,{value:m},e.children)}a(258);function J(){var e=function(){var e=r.a.useContext(B);if(!e)throw new Error("useStitchAuth must be used within a StitchAuthProvider");return e}(),t=(e.isLoggedIn,e.actions),a=(t.handleLogout,t.handleAnonymousLogin);return Object(n.useEffect)(function(){a()},[]),r.a.createElement(U,null)}a(259);var K=document.getElementById("root");l.a.render(r.a.createElement(function(){return r.a.createElement(q,null,r.a.createElement(J,null))},null),K)}},[[134,1,2]]]);
//# sourceMappingURL=main.77a04f46.chunk.js.map