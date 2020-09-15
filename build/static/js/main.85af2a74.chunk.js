(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{134:function(e,t,a){e.exports=a(260)},145:function(e){e.exports={}},260:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),r=a(25),o=a.n(r),c=(a(261),a(139),a(20)),s=a(14),i=a(111),u=a(121),m=i.a,h=Object(c.a)(u,["geoPath"]),d=Object(n.createContext)(),E=function(e){var t=e.width,a=e.height,r=e.offsetX,o=e.offsetY,i=e.projection,u=e.projectionConfig,E=Object(c.a)(e,["width","height","offsetX","offsetY","projection","projectionConfig"]),f=u.center||[],g=Object(s.a)(f,2),p=g[0],b=g[1],C=u.rotate||[],y=Object(s.a)(C,3),v=y[0],j=y[1],w=y[2],O=u.parallels||[],S=Object(s.a)(O,2),x=S[0],H=S[1],M=u.scale||null,A=Object(n.useMemo)(function(){return function(e){var t=e.projectionConfig,a=void 0===t?{}:t,n=e.projection,l=void 0===n?"geoEqualEarth":n,r=e.width,o=void 0===r?800:r,c=e.height,s=void 0===c?600:c,i=e.offsetX,u=void 0===i?0:i,m=e.offsetY,d=void 0===m?0:m;if("function"===typeof l)return l;var E=a.scale||null,f=h[l]().translate([o/2+u*E/1e3,s+d*E/1e3]).rotate([82+10/60,-30]).scale(100);return[f.center?"center":null,f.rotate?"rotate":null,f.scale?"scale":null,f.parallels?"parallels":null].forEach(function(e){e&&(f=f[e](a[e]||f[e]()))}),f}({projectionConfig:{center:p||0===p||b||0===b?[p,b]:null,rotate:v||0===v||j||0===j?[v,j,w]:null,parallels:x||0===x||H||0===H?[x,H]:null,scale:M},projection:i,width:t,height:a,offsetX:r,offsetY:o})},[t,a,i,p,b,v,j,w,x,H,M,r,o]),T=Object(n.useCallback)(A,[A]),R=Object(n.useMemo)(function(){return{width:t,height:a,projection:T,path:m().projection(T)}},[t,a,T]);return l.a.createElement(d.Provider,Object.assign({value:R},E))},f=a(27),g=a(122);function p(e,t){if(Array.isArray(e))return t?t(e):e;var a=Object(g.a)(e,e.objects[Object.keys(e.objects)[0]]).features;return console.log(e.objects[Object.keys(e.objects)[0]]),t?t(a):a}function b(e){var t=e.geography,a=e.parseGeographies,l=Object(n.useContext)(d).path,r=Object(n.useState)(),o=Object(s.a)(r,2),c=o[0],i=o[1];return Object(n.useEffect)(function(){var e;"undefined"!==typeof window&&("string"===typeof t?(e=t,fetch(e).then(function(e){if(!e.ok)throw Error(e.statusText);return e.json()}).catch(function(e){console.log("There was a problem when fetching the data: ",e)})).then(function(e){e&&i(p(e,a))}):i(p(t,a)))},[t,a]),{geographies:Object(n.useMemo)(function(){return function(e,t){return e?e.map(function(e,a){return Object(f.a)({},e,{rsmKey:"geo-".concat(a),svgPath:t(e)})}):[]}(c,l)},[c,l])}}var C=function(e){var t=e.geography,a=e.children,r=e.parseGeographies,o=e.className,s=void 0===o?"":o,i=Object(c.a)(e,["geography","children","parseGeographies","className"]),u=Object(n.useContext)(d),m=u.path,h=u.projection,E=b({geography:t,parseGeographies:r}).geographies;return l.a.createElement("g",Object.assign({className:"rsm-geographies ".concat(s),height:100},i),E&&E.length>0&&a({geographies:E,path:m,projection:h}))},y=Object(n.memo)(function(e){var t=e.geography,a=e.onMouseEnter,r=e.onMouseLeave,o=e.onMouseDown,i=e.onMouseUp,u=e.onFocus,m=e.onBlur,h=e.style,d=void 0===h?{}:h,E=e.className,f=void 0===E?"":E,g=Object(c.a)(e,["geography","onMouseEnter","onMouseLeave","onMouseDown","onMouseUp","onFocus","onBlur","style","className"]),p=Object(n.useState)(!1),b=Object(s.a)(p,2),C=b[0],y=b[1],v=Object(n.useState)(!1),j=Object(s.a)(v,2),w=j[0],O=j[1];return l.a.createElement("path",Object.assign({tabIndex:"0",className:"rsm-geography ".concat(f),d:t.svgPath,onMouseEnter:function(e){O(!0),a&&a(e)},onMouseLeave:function(e){O(!1),C&&y(!1),r&&r(e)},onFocus:function(e){O(!0),u&&u(e)},onBlur:function(e){O(!1),C&&y(!1),m&&m(e)},onMouseDown:function(e){y(!0),o&&o(e)},onMouseUp:function(e){y(!1),i&&i(e)},style:d[C||w?C?"pressed":"hover":"default"]},g))}),v=function(e){var t=e.width,a=void 0===t?800:t,n=e.height,r=void 0===n?600:n,o=e.offsetX,s=void 0===o?0:o,i=e.offsetY,u=void 0===i?0:i,m=e.projection,h=void 0===m?"geoEqualEarth":m,d=e.projectionConfig,f=void 0===d?{}:d,g=e.className,p=void 0===g?"":g,b=Object(c.a)(e,["width","height","offsetX","offsetY","projection","projectionConfig","className"]);return l.a.createElement(E,{width:a,height:r,offsetX:s,offsetY:u,projection:h,projectionConfig:f},l.a.createElement("svg",Object.assign({width:a,height:r,className:"rsm-svg ".concat(p)},b)))},j=(a(145),l.a.createContext());function w(){var e=l.a.useContext(j);if(!e)throw new Error("useGADM must be used within a GADMProvider");return e}function O(e){var t=l.a.useState({selectedVariable:{varName:"percentDiabetes",printName:"% with Diabetes"},selectedCounty:{NAME:"Fulton",GEOID:"13121"}}),a=Object(s.a)(t,2),n=a[0],r=a[1],o=function(e){r(Object(f.a)({},n,e))},c=l.a.useMemo(function(){return{selectedVariable:n.selectedVariable,selectedCounty:n.selectedCounty,actions:{handlePageStateChange:o}}},[n]);return l.a.createElement(j.Provider,{value:c},e.children)}var S="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/GA-13-georgia-counties.json";function x(e){var t=w(),a=(t.selectedVariable,t.selectedCounty,t.actions.handlePageStateChange);return l.a.createElement("div",null,l.a.createElement(v,{projection:"geoTransverseMercator","data-tip":"",width:760,height:580,strokeWidth:.5,stroke:"black",projectionConfig:{scale:6e3}},l.a.createElement(C,{geography:S},function(e){var t=e.geographies;return l.a.createElement("svg",null,t.map(function(e){return l.a.createElement(y,{key:e.rsmKey,geography:e,onClick:function(){},onMouseEnter:function(){a({selectedCounty:e.properties})},onMouseLeave:function(){},fill:"#FFFFFF"})}))})))}var H=a(273),M=a(274),A=a(271),T=a(268),R=a(272),L=a(269);function k(){var e=w(),t=e.selectedVariable,a=e.selectedCounty;e.actions.handlePageStateChange;return Object(n.useEffect)(function(){console.log("DataPanel "+JSON.stringify(a))},[t,a]),l.a.createElement(H.a,null,l.a.createElement(H.a.Row,null,l.a.createElement(H.a.Column,null,l.a.createElement(M.a,{as:"h3",style:{fontWeight:300}},"Statistics of ",a.NAME,l.a.createElement(M.a.Subheader,{style:{fontWeight:300}},"The tables below show diabetes-related health determinants of the ",a.NAME," county.")))),l.a.createElement(H.a.Row,{columns:2},l.a.createElement(H.a.Column,{textAlign:"left"},l.a.createElement(M.a,{as:"h4",style:{fontWeight:300}},"1. Demographic Composition"),l.a.createElement(A.a,{selectable:!0,basic:"very",size:"small"},l.a.createElement(A.a.Header,null,l.a.createElement(A.a.Row,null,l.a.createElement(A.a.HeaderCell,{style:{borderTop:0}},"Variable"),l.a.createElement(A.a.HeaderCell,{style:{borderTop:0}},"County Stat"),l.a.createElement(A.a.HeaderCell,{style:{borderTop:0}},"State Stat"))),l.a.createElement(A.a.Body,null,l.a.createElement(A.a.Row,null,l.a.createElement(A.a.Cell,null,"Example"),l.a.createElement(A.a.Cell,null,"use _.map()"),l.a.createElement(A.a.Cell,null,".."))))),l.a.createElement(H.a.Column,{textAlign:"left"},l.a.createElement(M.a,{as:"h4",style:{fontWeight:300}},"2. Cardiometabolic Disease Morbidity"),l.a.createElement(A.a,{selectable:!0,basic:"very",size:"small"},l.a.createElement(A.a.Header,null,l.a.createElement(A.a.Row,null,l.a.createElement(A.a.HeaderCell,{style:{borderTop:0}},"Variable"),l.a.createElement(A.a.HeaderCell,{style:{borderTop:0}},"County Stat"),l.a.createElement(A.a.HeaderCell,{style:{borderTop:0}},"State Stat"))),l.a.createElement(A.a.Body,null,l.a.createElement(A.a.Row,null,l.a.createElement(A.a.Cell,null,"Example"),l.a.createElement(A.a.Cell,null,"use _.map()"),l.a.createElement(A.a.Cell,null,"..")))))),l.a.createElement(H.a.Row,{columns:2},l.a.createElement(H.a.Column,{textAlign:"left"},l.a.createElement(M.a,{as:"h4",style:{fontWeight:300}},"3. Clinical Events"),l.a.createElement(A.a,{selectable:!0,basic:"very",size:"small"},l.a.createElement(A.a.Header,null,l.a.createElement(A.a.Row,null,l.a.createElement(A.a.HeaderCell,{style:{borderTop:0}},"Variable"),l.a.createElement(A.a.HeaderCell,{style:{borderTop:0}},"County Stat"),l.a.createElement(A.a.HeaderCell,{style:{borderTop:0}},"State Stat"))),l.a.createElement(A.a.Body,null,l.a.createElement(A.a.Row,null,l.a.createElement(A.a.Cell,null,"Example"),l.a.createElement(A.a.Cell,null,"use _.map()"),l.a.createElement(A.a.Cell,null,".."))))),l.a.createElement(H.a.Column,{textAlign:"left"},l.a.createElement(M.a,{as:"h4",style:{fontWeight:300}},"4. Lifestyle Related Risk Factors"),l.a.createElement(A.a,{selectable:!0,basic:"very",size:"small"},l.a.createElement(A.a.Header,null,l.a.createElement(A.a.Row,null,l.a.createElement(A.a.HeaderCell,{style:{borderTop:0}},"Variable"),l.a.createElement(A.a.HeaderCell,{style:{borderTop:0}},"County Stat"),l.a.createElement(A.a.HeaderCell,{style:{borderTop:0}},"State Stat"))),l.a.createElement(A.a.Body,null,l.a.createElement(A.a.Row,null,l.a.createElement(A.a.Cell,null,"Example"),l.a.createElement(A.a.Cell,null,"use _.map()"),l.a.createElement(A.a.Cell,null,"..")))))),l.a.createElement(H.a.Row,{columns:2},l.a.createElement(H.a.Column,{textAlign:"left"},l.a.createElement(M.a,{as:"h4",style:{fontWeight:300}},"5. Health Care"),l.a.createElement(A.a,{selectable:!0,basic:"very",size:"small"},l.a.createElement(A.a.Header,null,l.a.createElement(A.a.Row,null,l.a.createElement(A.a.HeaderCell,{style:{borderTop:0}},"Variable"),l.a.createElement(A.a.HeaderCell,{style:{borderTop:0}},"County Stat"),l.a.createElement(A.a.HeaderCell,{style:{borderTop:0}},"State Stat"))),l.a.createElement(A.a.Body,null,l.a.createElement(A.a.Row,null,l.a.createElement(A.a.Cell,null,"Example"),l.a.createElement(A.a.Cell,null,"use _.map()"),l.a.createElement(A.a.Cell,null,".."))))),l.a.createElement(H.a.Column,{textAlign:"left"},l.a.createElement(M.a,{as:"h4",style:{fontWeight:300}},"6. Socioeconomic Factors"),l.a.createElement(A.a,{selectable:!0,basic:"very",size:"small"},l.a.createElement(A.a.Header,null,l.a.createElement(A.a.Row,null,l.a.createElement(A.a.HeaderCell,{style:{borderTop:0}},"Variable"),l.a.createElement(A.a.HeaderCell,{style:{borderTop:0}},"County Stat"),l.a.createElement(A.a.HeaderCell,{style:{borderTop:0}},"State Stat"))),l.a.createElement(A.a.Body,null,l.a.createElement(A.a.Row,null,l.a.createElement(A.a.Cell,null,"Example"),l.a.createElement(A.a.Cell,null,"use _.map()"),l.a.createElement(A.a.Cell,null,"..")))))))}function I(){var e=w(),t=e.selectedVariable;e.selectedCounty,e.actions.handlePageStateChange;return l.a.createElement(H.a,null,l.a.createElement(H.a.Row,null,l.a.createElement(H.a.Column,null,l.a.createElement(M.a,{as:"h3",style:{fontWeight:300}},t.printName,l.a.createElement(M.a.Subheader,{style:{fontWeight:300}},"The color on the map shows the ",t.printName," of the Georgia Counties.")))),l.a.createElement(H.a.Row,null,l.a.createElement(H.a.Column,null,l.a.createElement(x,null))))}function N(){return l.a.createElement(O,null,l.a.createElement(T.a,null,l.a.createElement(H.a,{style:{paddingTop:"2em"}},l.a.createElement(H.a.Row,{columns:1},l.a.createElement(H.a.Column,{textAlign:"center"},l.a.createElement(M.a,{as:"h1",style:{fontWeight:300}},"Georgia Diabetes Data Poral",l.a.createElement(M.a.Subheader,{style:{fontWeight:300}},"Interactive Dashboard of Diabetes-related Health Determinants")),l.a.createElement(M.a,{as:"h4",style:{fontWeight:300}},"A Quick User Guide"),l.a.createElement(R.a,{bulleted:!0,style:{fontWeight:300},size:"mini"},l.a.createElement(R.a.Item,null,"Click on a county on the map located ",l.a.createElement("i",null,"(on the left)")," ",l.a.createElement("br",null),"to see its full statistics on the table ",l.a.createElement("i",null,"(on the right)"),"."),l.a.createElement(R.a.Item,null,"Click on a variable on the table located ",l.a.createElement("i",null,"(on the right)")," ",l.a.createElement("br",null),"to see the county-level distribution on the map ",l.a.createElement("i",null,"(on the left)"),".")))),l.a.createElement(L.a,null),l.a.createElement(H.a.Row,{columns:2},l.a.createElement(H.a.Column,{width:8,textAlign:"center"},l.a.createElement(I,null)),l.a.createElement(H.a.Column,{width:8,textAlign:"center"},l.a.createElement(k,null))))))}var W=a(23),D=a.n(W),P=a(81),F=a(35),V=F.b.hasAppClient("test-owzgf")?F.b.getAppClient("test-owzgf"):F.b.initializeAppClient("test-owzgf");function z(){var e=new F.a;return V.auth.loginWithCredential(e)}function G(){return V.auth.isLoggedIn?V.auth.user:null}function B(){var e=G();return V.auth.logoutUserWithId(e.id)}var U=l.a.createContext();function X(e){var t=l.a.useState({isLoggedIn:V.auth.isLoggedIn,currentUser:G()}),a=Object(s.a)(t,2),n=a[0],r=a[1],o=function(){var e=Object(P.a)(D.a.mark(function e(){var t;return D.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n.isLoggedIn){e.next=6;break}return e.next=4,z();case 4:t=e.sent,r(Object(f.a)({},n,{isLoggedIn:!0,currentUser:t}));case 6:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),c=function(){var e=Object(P.a)(D.a.mark(function e(){return D.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.isLoggedIn){e.next=7;break}return e.next=4,B();case 4:r(Object(f.a)({},n,{isLoggedIn:!1,currentUser:null})),e.next=8;break;case 7:console.log("can't handleLogout when no user is logged in");case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),i=l.a.useMemo(function(){return{isLoggedIn:n.isLoggedIn,currentUser:n.currentUser,actions:{handleAnonymousLogin:o,handleLogout:c}}},[n.isLoggedIn]);return l.a.createElement(U.Provider,{value:i},e.children)}a(258);function Y(){var e=function(){var e=l.a.useContext(U);if(!e)throw new Error("useStitchAuth must be used within a StitchAuthProvider");return e}(),t=(e.isLoggedIn,e.actions),a=(t.handleLogout,t.handleAnonymousLogin);return Object(n.useEffect)(function(){a()},[]),l.a.createElement(N,null)}a(259);var _=document.getElementById("root");o.a.render(l.a.createElement(function(){return l.a.createElement(X,null,l.a.createElement(Y,null))},null),_)}},[[134,1,2]]]);
//# sourceMappingURL=main.85af2a74.chunk.js.map