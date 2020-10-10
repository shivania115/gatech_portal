(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{139:function(e,t,a){e.exports=a(277)},275:function(e,t,a){},277:function(e,t,a){"use strict";a.r(t);var n=a(1),o=a.n(n),r=a(29),l=a.n(r),i=a(15),c=a.n(i),s=a(45),u=a(8),m=a(84),d=a(23),h=a(115),g=a(126),f=h.a,p=Object(d.a)(g,["geoPath"]),b=Object(n.createContext)(),y=function(e){var t=e.width,a=e.height,r=e.offsetX,l=e.offsetY,i=e.projection,c=e.projectionConfig,s=Object(d.a)(e,["width","height","offsetX","offsetY","projection","projectionConfig"]),m=c.center||[],h=Object(u.a)(m,2),g=h[0],y=h[1],E=c.rotate||[],v=Object(u.a)(E,3),j=v[0],C=v[1],w=v[2],O=c.parallels||[],x=Object(u.a)(O,2),k=x[0],N=x[1],S=c.scale||null,A=Object(n.useMemo)(function(){return function(e){var t=e.projectionConfig,a=void 0===t?{}:t,n=e.projection,o=void 0===n?"geoEqualEarth":n,r=e.width,l=void 0===r?800:r,i=e.height,c=void 0===i?600:i,s=e.offsetX,u=void 0===s?0:s,m=e.offsetY,d=void 0===m?0:m;if("function"===typeof o)return o;var h=a.scale||null,g=p[o]().translate([l/2+u*h/1e3,c+d*h/1e3]).rotate([82+10/60,-30]).scale(100);return[g.center?"center":null,g.rotate?"rotate":null,g.scale?"scale":null,g.parallels?"parallels":null].forEach(function(e){e&&(g=g[e](a[e]||g[e]()))}),g}({projectionConfig:{center:g||0===g||y||0===y?[g,y]:null,rotate:j||0===j||C||0===C?[j,C,w]:null,parallels:k||0===k||N||0===N?[k,N]:null,scale:S},projection:i,width:t,height:a,offsetX:r,offsetY:l})},[t,a,i,g,y,j,C,w,k,N,S,r,l]),D=Object(n.useCallback)(A,[A]),M=Object(n.useMemo)(function(){return{width:t,height:a,projection:D,path:f().projection(D)}},[t,a,D]);return o.a.createElement(b.Provider,Object.assign({value:M},s))},E=a(30),v=a(127);function j(e,t){if(Array.isArray(e))return t?t(e):e;var a=Object(v.a)(e,e.objects[Object.keys(e.objects)[0]]).features;return console.log(e.objects[Object.keys(e.objects)[0]]),t?t(a):a}function C(e){var t=e.geography,a=e.parseGeographies,o=Object(n.useContext)(b).path,r=Object(n.useState)(),l=Object(u.a)(r,2),i=l[0],c=l[1];return Object(n.useEffect)(function(){var e;"undefined"!==typeof window&&("string"===typeof t?(e=t,fetch(e).then(function(e){if(!e.ok)throw Error(e.statusText);return e.json()}).catch(function(e){console.log("There was a problem when fetching the data: ",e)})).then(function(e){e&&c(j(e,a))}):c(j(t,a)))},[t,a]),{geographies:Object(n.useMemo)(function(){return function(e,t){return e?e.map(function(e,a){return Object(E.a)({},e,{rsmKey:"geo-".concat(a),svgPath:t(e)})}):[]}(i,o)},[i,o])}}var w=function(e){var t=e.geography,a=e.children,r=e.parseGeographies,l=e.className,i=void 0===l?"":l,c=Object(d.a)(e,["geography","children","parseGeographies","className"]),s=Object(n.useContext)(b),u=s.path,m=s.projection,h=C({geography:t,parseGeographies:r}).geographies;return o.a.createElement("g",Object.assign({className:"rsm-geographies ".concat(i),height:100},c),h&&h.length>0&&a({geographies:h,path:u,projection:m}))},O=Object(n.memo)(function(e){var t=e.geography,a=e.onMouseEnter,r=e.onMouseLeave,l=e.onMouseDown,i=e.onMouseUp,c=e.onFocus,s=e.onBlur,m=e.style,h=void 0===m?{}:m,g=e.className,f=void 0===g?"":g,p=Object(d.a)(e,["geography","onMouseEnter","onMouseLeave","onMouseDown","onMouseUp","onFocus","onBlur","style","className"]),b=Object(n.useState)(!1),y=Object(u.a)(b,2),E=y[0],v=y[1],j=Object(n.useState)(!1),C=Object(u.a)(j,2),w=C[0],O=C[1];return o.a.createElement("path",Object.assign({tabIndex:"0",className:"rsm-geography ".concat(f),d:t.svgPath,onMouseEnter:function(e){O(!0),a&&a(e)},onMouseLeave:function(e){O(!1),E&&v(!1),r&&r(e)},onFocus:function(e){O(!0),c&&c(e)},onBlur:function(e){O(!1),E&&v(!1),s&&s(e)},onMouseDown:function(e){v(!0),l&&l(e)},onMouseUp:function(e){v(!1),i&&i(e)},style:h[E||w?E?"pressed":"hover":"default"]},p))}),x=function(e){var t=e.width,a=void 0===t?800:t,n=e.height,r=void 0===n?600:n,l=e.offsetX,i=void 0===l?0:l,c=e.offsetY,s=void 0===c?0:c,u=e.projection,m=void 0===u?"geoEqualEarth":u,h=e.projectionConfig,g=void 0===h?{}:h,f=e.className,p=void 0===f?"":f,b=Object(d.a)(e,["width","height","offsetX","offsetY","projection","projectionConfig","className"]);return o.a.createElement(y,{width:a,height:r,offsetX:i,offsetY:s,projection:m,projectionConfig:g},o.a.createElement("svg",Object.assign({width:a,height:r,className:"rsm-svg ".concat(p)},b)))},k=a(285),N=o.a.createContext();function S(){var e=o.a.useContext(N);if(!e)throw new Error("useGADM must be used within a GADMProvider");return e}function A(e){var t=o.a.useState({selectedTable:{tableName:"Demographic Composition",qryName:"Demographic Composition"},selectedVariable:{varName:"65 years or older",printName:"% of 65 y or older"},selectedCounty:{NAME:"Fulton",GEOID:"13121"},fetchedData:[]}),a=Object(u.a)(t,2),n=a[0],r=a[1],l=function(e){r(Object(E.a)({},n,e))},i=o.a.useMemo(function(){var e=n.selectedTable,t=n.selectedVariable,a=n.selectedCounty,o=n.fetchedData;n.firstRender;return{selectedTable:e,selectedVariable:t,selectedCounty:a,fetchedData:o,actions:{handlePageStateChange:l}}},[n]);return o.a.createElement(N.Provider,{value:i},e.children)}var D=a(26),M=D.c.hasAppClient("test-owzgf")?D.c.getAppClient("test-owzgf"):D.c.initializeAppClient("test-owzgf");function I(){var e=new D.a;return M.auth.loginWithCredential(e)}function F(){return M.auth.isLoggedIn?M.auth.user:null}function L(){var e=F();return M.auth.logoutUserWithId(e.id)}var T=o.a.createContext();function R(){var e=o.a.useContext(T);if(!e)throw new Error("useStitchAuth must be used within a StitchAuthProvider");return e}function z(e){var t=o.a.useState({isLoggedIn:M.auth.isLoggedIn,currentUser:F()}),a=Object(u.a)(t,2),n=a[0],r=a[1],l=function(){var e=Object(s.a)(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n.isLoggedIn){e.next=6;break}return e.next=4,I();case 4:t=e.sent,r(Object(E.a)({},n,{isLoggedIn:!0,currentUser:t}));case 6:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),i=function(){var e=Object(s.a)(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.isLoggedIn){e.next=7;break}return e.next=4,L();case 4:r(Object(E.a)({},n,{isLoggedIn:!1,currentUser:null})),e.next=8;break;case 7:console.log("can't handleLogout when no user is logged in");case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),m=o.a.useMemo(function(){return{isLoggedIn:n.isLoggedIn,currentUser:n.currentUser,actions:{handleAnonymousLogin:l,handleLogout:i}}},[n.isLoggedIn]);return o.a.createElement(T.Provider,{value:m},e.children)}var W=a(14),P=a.n(W),q="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/GA-13-georgia-counties.json";function H(e){var t=Object(n.useState)(0),a=Object(u.a)(t,2),r=a[0],l=a[1],i=S(),c=i.selectedVariable,s=(i.selectedTable,i.selectedCounty),d=i.fetchedData,h=i.actions.handlePageStateChange,g=["#D8E7E9","#A4C8CB","#71A8AD","#4A7C82","#34575B","#253E41"],f=Object(n.useState)(0),p=Object(u.a)(f,2),b=p[0],y=p[1],E=Object(n.useState)([]),v=Object(u.a)(E,2),j=v[0],C=v[1],N=Object(n.useState)(),A=Object(u.a)(N,2),D=A[0],M=A[1],I=Object(n.useState)(),F=Object(u.a)(I,2),L=F[0],T=F[1];Object(n.useEffect)(function(){var e=P.a.filter(d,{subsubgroup:c.varName});console.log("var ",c.varName),console.log("fetched ",d),console.log("state ",e);var t=P.a.map(e,"value");console.log("var data ",t),t=t.filter(function(e){return"N/A"!==e}),M(Math.min.apply(Math,Object(m.a)(t)).toFixed(1)),T(Math.max.apply(Math,Object(m.a)(t)).toFixed(1));var a=Object(k.a)().domain(t).range(g),n={};P.a.forEach(e,function(e){n[e.county]=a(e.value)}),y(n),C(a.quantiles()),console.log("sm",n)},[c,d]);return o.a.createElement("div",null,o.a.createElement("div",null,Object.keys(b).length>0?o.a.createElement("svg",{width:"280",height:"80",transform:"translate(-20,-10)"},P.a.map(j,function(e,t){return j[t]<1?o.a.createElement("text",{key:t,x:64+24*t,y:35,style:{fontSize:"0.6em"}}," ",j[t].toFixed(1)):j[t]>999999?o.a.createElement("text",{key:t,x:64+24*t,y:35,style:{fontSize:"0.6em"}}," ",(j[t]/1e6).toFixed(1)+"M"):j[t]>999?o.a.createElement("text",{key:t,x:64+24*t,y:35,style:{fontSize:"0.6em"}}," ",(j[t]/1e3).toFixed(1)+"K"):o.a.createElement("text",{key:t,x:64+24*t,y:35,style:{fontSize:"0.6em"}}," ",j[t].toFixed(1))}),o.a.createElement("text",{x:40,y:35,style:{fontSize:"0.7em"}},D),o.a.createElement("text",{x:182,y:35,style:{fontSize:"0.7em"}},L),P.a.map(g,function(e,t){return o.a.createElement("rect",{key:t,x:50+24*t,y:40,width:"22",height:"20",style:{fill:e,strokeWidth:1,stroke:e}})}),o.a.createElement("text",{x:42,y:74,style:{fontSize:"0.7em"}},"Low"),o.a.createElement("text",{x:80+20*(g.length-1),y:74,style:{fontSize:"0.7em"}},"High"),o.a.createElement("rect",{x:220,y:40,width:"20",height:"20",style:{fill:"#FFFFFF",strokeWidth:.5,stroke:"#000000"}}),o.a.createElement("text",{x:245,y:48,style:{fontSize:"0.7em"}}," None "),o.a.createElement("text",{x:245,y:58,style:{fontSize:"0.7em"}}," Reported ")):void 0),o.a.createElement(x,{projection:"geoTransverseMercator","data-tip":"",width:760,height:530,strokeWidth:.5,stroke:"black",projectionConfig:{scale:6e3}},o.a.createElement(w,{geography:q,transform:"translate(10,0)"},function(e){var t=e.geographies;return o.a.createElement("svg",null,t.map(function(e){return o.a.createElement(O,{key:e.rsmKey,geography:e,onClick:function(){h({selectedCounty:e.properties})},onMouseEnter:function(){l(e.properties.GEOID)},onMouseLeave:function(){l(0)},fill:r===e.properties.GEOID?"#f2a900":void 0===b[e.properties.NAME+" County"]?"white":b[e.properties.NAME+" County"],strokeWidth:s.GEOID===e.properties.GEOID?3.5:.5,stroke:s.GEOID===e.properties.GEOID?"#da291c":"black"})}))})))}var G=a(286),B=a(289),U=a(290),V=a(283),X=a(287),Y=M.getServiceClient(D.b.factory,"mongodb-atlas").db("healthequity").collection("gatech"),K=a(288);function J(e){var t=e.categories,a=Object(n.useState)([]),r=Object(u.a)(a,2),l=r[0],i=r[1],c=Object(n.useState)([]),s=Object(u.a)(c,2),m=s[0],d=s[1],h=S(),g=h.selectedCounty,f=h.selectedTable,p=h.selectedVariable,b=h.fetchedData,y=h.actions.handlePageStateChange;Object(n.useEffect)(function(){!function(){var e=P.a.sortBy(P.a.filter(P.a.reject(b,["subsubgroup","% Diabetes in Medicaid Population"]),{subgroup:f.qryName,county:g.NAME+" County"}),["subsubgroup"]);console.log("subGroup",f.qryName),console.log("county",g.NAME+" County"),console.log(e),i(e);var t,a=P.a.groupBy(P.a.filter(P.a.reject(b,["subsubgroup","% Diabetes in Medicaid Population"]),{subgroup:f.qryName}),"subsubgroup");console.log("groups ",a);var n=[];for(t in a){var o=P.a.meanBy(P.a.reject(a[t],["value","N/A"]),function(e){return e.value});n.push(o.toFixed(1))}console.log("ave ",n),d(n)}()},[g,f,b]);var E=l.map(function(e,a){var n;if("N/A"!==e.value){var r=(e.value+"").split(".");n=void 0!==r[1]&&r[1].length>2?e.value.toFixed(2):e.value}else n=e.value;return o.a.createElement(G.a.Row,{key:a,onClick:function(){y({selectedVariable:{varName:e.subsubgroup,printName:t[a]}})},active:p.printName===t[a]},o.a.createElement(G.a.Cell,{style:{fontSize:"0.9em",verticalAlign:"middle",textAlign:"left",paddingLeft:"0.5em"}},t[a]),o.a.createElement(G.a.Cell,{style:{fontSize:"0.9em",verticalAlign:"middle",textAlign:"center",paddingLeft:"0.2em",paddingRight:"0.2em"}},n),o.a.createElement(G.a.Cell,{style:{fontSize:"0.9em",verticalAlign:"middle",textAlign:"center",paddingLeft:"0.2em",paddingRight:"0.2em"}},m[a]))});return o.a.createElement(G.a.Body,null,E)}function $(){var e=S(),t=e.selectedTable,a=e.actions.handlePageStateChange;return o.a.createElement(K.a,{vertical:!0,tabular:!0,inverted:!0,style:{height:"100%",width:"95%"}},o.a.createElement(K.a.Item,{name:"Demographic Composition",style:{lineHeight:"1.3em",color:"black"},color:"blue",active:"Demographic Composition"===t.tableName,onClick:function(){a({selectedTable:{tableName:"Demographic Composition",qryName:"Demographic Composition"}})}}),o.a.createElement(K.a.Item,{name:"Cardiometabolic Disease Morbidity",style:{lineHeight:"1.3em",color:"black"},color:"blue",active:"Cardiometabolic Disease Morbidity"===t.tableName,onClick:function(){a({selectedTable:{tableName:"Cardiometabolic Disease Morbidity",qryName:"Cardiometabolic disease morbidity"}})}}),o.a.createElement(K.a.Item,{name:"Clinical Events",style:{lineHeight:"1.3em",color:"black"},color:"blue",active:"Clinical Events"===t.tableName,onClick:function(){a({selectedTable:{tableName:"Clinical Events",qryName:"Clinical events"}})}}),o.a.createElement(K.a.Item,{name:"Lifestyle Related Risk Factors",style:{lineHeight:"1.3em",color:"black"},color:"blue",active:"Lifestyle Related Risk Factors"===t.tableName,onClick:function(){a({selectedTable:{tableName:"Lifestyle Related Risk Factors",qryName:"Lifestyle Related Risk Factors"}})}}),o.a.createElement(K.a.Item,{name:"Health Care",style:{lineHeight:"1.3em",color:"black"},color:"blue",active:"Healthcare"===t.tableName,onClick:function(){a({selectedTable:{tableName:"Healthcare",qryName:"Healthcare"}})}}),o.a.createElement(K.a.Item,{name:"Socioeconomic Factors",style:{lineHeight:"1.3em",color:"black"},color:"blue",active:"Socioeconomic Factors"===t.tableName,onClick:function(){a({selectedTable:{tableName:"Socioeconomic Factors",qryName:"Socioeconomic Factors"}})}}),o.a.createElement(K.a.Item,{name:"Environmental Factors",style:{lineHeight:"1.3em",color:"black"},color:"blue",active:"Environmental Factors"===t.tableName,onClick:function(){a({selectedTable:{tableName:"Environmental Factors",qryName:"Environmental Factors"}})}}))}function Q(){var e=R().isLoggedIn,t=S(),a=t.selectedTable,r=(t.selectedVariable,t.selectedCounty),l=(t.fetchedData,t.actions.handlePageStateChange),i=function(){var e=Object(s.a)(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Y.find({},{projection:{subgroup:1,subsubgroup:1,value:1,county:1}}).toArray();case 2:t=e.sent,l({fetchedData:t}),console.log(t);case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();Object(n.useEffect)(function(){!0===e&&i()},[]);return o.a.createElement(B.a,null,o.a.createElement(B.a.Row,null,o.a.createElement(B.a.Column,null,o.a.createElement(U.a,{as:"h3",style:{fontWeight:300}},"Statistics of ",r.NAME," County",o.a.createElement(U.a.Subheader,{style:{fontWeight:300}},"The table below show diabetes-related health determinants of ",r.NAME," county.")))),o.a.createElement(B.a.Row,{columns:2},o.a.createElement(B.a.Column,{textAlign:"left",style:{paddingTop:"1em",paddingLeft:"4em"}},o.a.createElement(B.a.Row,null,o.a.createElement(U.a,{as:"h4",style:{fontWeight:300,color:"#da291c",paddingLeft:"1em"}},o.a.createElement("i",null,o.a.createElement("b",null,"Select a category of county characteristics for display")))),o.a.createElement(B.a.Row,{style:{paddingTop:"1.2em",width:"95%"}},o.a.createElement($,null))),o.a.createElement(B.a.Column,{style:{paddingTop:"2.4em",textAlign:"center"}},o.a.createElement(U.a,{block:!0,as:"h4",style:{fontWeight:550,backgroundColor:"#012169",color:"whitesmoke",verticalAlign:"center",margin:"0em",paddingTop:"0.4em",paddingBottom:"0.4em",border:"0",borderRadius:"0.6em 0em 0.6em 0em"}},a.tableName),o.a.createElement(G.a,{selectable:!0,basic:"very",fixed:!0,style:{width:"100%"}},o.a.createElement(G.a.Header,null,o.a.createElement(G.a.Row,null,o.a.createElement(G.a.HeaderCell,{style:{borderTop:0,fontWeight:500,textAlign:"center",width:"50%"}},"Characteristic"),o.a.createElement(G.a.HeaderCell,{style:{borderTop:0,fontWeight:500,textAlign:"center",width:"27%",paddingLeft:"0",paddingRight:"0"}},"County Stat"),o.a.createElement(G.a.HeaderCell,{style:{borderTop:0,fontWeight:500,textAlign:"center",width:"25%"}},"State Mean"))),o.a.createElement(J,{categories:"Demographic Composition"===a.tableName?["% of 65 y or older","% Black/African American","% Asian","% Foreign born","% Hispanic","Median age (y)","Total Population, thousands","% Women"]:"Cardiometabolic disease morbidity"===a.qryName?["% CHD Prevalence in Medicaid population","% with Diabetes","% with Hypertension in Medicaid population","Newly diagnosed diabetes (new cases per 1,000)","% Obese"]:"Clinical events"===a.qryName?["CVD deaths per 100,000","CVD hospitalizations per 100,000","Diabetes deaths per 100,000","Diabetes hospitalizations per 100,000","Kidney hospitalizations per 100,000"]:"Lifestyle Related Risk Factors"===a.qryName?["% Excessive drinkers","% Physical inactive","% Insufficient sleep (<7 hours)","% Current Smokers"]:"Healthcare"===a.qryName?["Cardiologists","Endocrinologists","Primary care doctors (ratio of population to primary care physicians)","% Uninsured"]:"Socioeconomic Factors"===a.qryName?["% Graduates high school in 4 years","% In poverty","Income Inequality","Median income ($)","% Unemployed"]:"Environmental Factors"===a.qryName?["% Exercise opportunities","Food environment index","% Severe housing problems","Residential segregation score"]:void 0})))))}function Z(){var e=S(),t=e.selectedVariable;e.selectedCounty,e.actions.handlePageStateChange;return o.a.createElement(B.a,null,o.a.createElement(B.a.Row,null,o.a.createElement(B.a.Column,null,o.a.createElement(U.a,{as:"h3",style:{fontWeight:600,paddingLeft:"2em",height:"3em",color:"#b58500"}},t.printName,o.a.createElement(U.a.Subheader,{style:{fontWeight:300,margin:"0em"}},"The color shows the distribution of ",t.printName," across the Georgia counties.")),o.a.createElement(U.a,{as:"h4",style:{fontWeight:300,paddingTop:"0em",paddingLeft:"4em",paddingBottom:"-1em",textAlign:"left",color:"#da291c"}},o.a.createElement("i",null,o.a.createElement("b",null,"Select a county to see detailed characteristics"))))),o.a.createElement(B.a.Row,{style:{padding:"0"}},o.a.createElement(B.a.Column,null,o.a.createElement(H,null))))}function _(){var e=Object(n.useState)(!1),t=Object(u.a)(e,2),a=t[0],r=t[1],l=Object(n.useState)(0),i=Object(u.a)(l,2),c=i[0],s=i[1],m=0;return Object(n.useEffect)(function(){var e=document,t=e.documentElement,a=e.body;m=window.innerWidth||t.clientWidth||a.clientWidth,s(m),m<1200&&r(!0)},[c]),console.log(c),o.a.createElement(A,null,o.a.createElement(V.a,null,o.a.createElement(B.a,{style:{paddingTop:"2em"}},o.a.createElement(B.a.Row,{centered:!0,columns:1,style:{background:"linear-gradient(to bottom, #0c2340, #012169)"}},o.a.createElement(B.a.Column,{textAlign:"center"},o.a.createElement(U.a,{as:"h1",style:{fontWeight:500,color:"whitesmoke"}},"Georgia Diabetes Data Portal",o.a.createElement(U.a.Subheader,{style:{fontWeight:300,color:"whitesmoke"}},"Interactive Dashboard of Diabetes-Related Health Determinants")),o.a.createElement(X.a,{bulleted:!0,style:{fontWeight:300,color:"whitesmoke"},size:"mini"},o.a.createElement(X.a.Item,null,"Click on a Characteristic on the table located ",o.a.createElement("i",null,"on the left")," ",o.a.createElement("br",null),"to see the county-level distribution on the map ",o.a.createElement("i",null,"on the right"),"."),o.a.createElement(X.a.Item,null,"Click on a county on the map located ",o.a.createElement("i",null,"on the right")," ",o.a.createElement("br",null),"to see its full statistics on the table ",o.a.createElement("i",null,"on the left"),".")))),o.a.createElement(B.a.Row,{centered:!0,columns:2,style:{display:a?"none":"block",paddingTop:"4em"}},o.a.createElement(B.a.Column,{width:8,textAlign:"center"},o.a.createElement(Q,null)),o.a.createElement(B.a.Column,{width:8,textAlign:"center"},o.a.createElement(Z,null))),o.a.createElement(B.a.Row,{style:{display:a?"block":"none",textAlign:"center",color:"red",fontSize:"1.5em",paddingTop:"4em"}},o.a.createElement(B.a.Column,null,o.a.createElement(X.a,null,o.a.createElement(X.a.Item,null,"Warning"),o.a.createElement(X.a.Item,{style:{fontSize:"0.8em"}},"Please expand your browser window and refresh the page to view the content."),o.a.createElement(X.a.Item,{style:{fontSize:"0.8em"}},"If you are using a mobile device, please use a PC to visit this page.")))))))}a(274),a(275);function ee(){var e=R(),t=(e.isLoggedIn,e.actions),a=(t.handleLogout,t.handleAnonymousLogin);return Object(n.useEffect)(function(){a()},[]),o.a.createElement(_,null)}a(276);var te=document.getElementById("root");l.a.render(o.a.createElement(function(){return o.a.createElement(z,null,o.a.createElement(ee,null))},null),te)}},[[139,1,2]]]);
//# sourceMappingURL=main.ad0c08ec.chunk.js.map