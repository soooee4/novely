"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[503],{175:(e,t,o)=>{o.r(t),o.d(t,{default:()=>k});var r=o(2791),n=o(7689),i=o(7630),l=o(697),a=o(7779),c=o(7545),d=o(890),s=o(2630),g=o(3826),h=o(184);const p=(0,i.ZP)(l.Z)({width:"100%",height:"100%",display:"flex",flexDirection:"column",padding:"0 3%",boxSizing:"border-box",marinTop:"-30px"}),x=(0,i.ZP)(l.Z)({width:"100%",height:"100%",display:"flex",gap:20,marginTop:20,boxSizing:"border-box"}),u=(0,i.ZP)(l.Z)({flex:1,height:"100%",boxSizing:"border-box",padding:15,paddingRight:5,borderRadius:10,border:"1px solid ".concat(g.r$.GRAY),"&>textarea::-webkit-scrollbar":{width:5},"&>textarea::-webkit-scrollbar-thumb":{background:"#aaa",borderRadius:5},"&>textarea::-webkit-scrollbar-track":{backgroundColor:"transparent"}}),_=(0,i.ZP)(l.Z)({width:"100%",display:"flex",boxSizing:"border-box"}),b=(0,i.ZP)(d.Z)({fontSize:13,margin:"3px 5px 0px auto"}),m=e=>{const[t,o]=(0,r.useState)(""),[n,i]=(0,r.useState)(""),[l,a]=(0,r.useState)(0);return(0,h.jsxs)(p,{children:[(0,h.jsxs)(_,{children:[(0,h.jsx)(s.Z,{fullWidth:!0,onChange:e=>{o(e.target.value)},sx:{width:"70%"},color:e.color,maxLength:50}),(0,h.jsx)(c.Z,{type:g.cO.BUTTON.BASIC,color:"#121212"===e.color?g.r$.WHITE:g.r$.BLACK,name:g.GP.BUTTONS.GOTONEXT,margin:"-17px 0px 0px auto",postAuthorNovel:()=>{e.setTitleContent({title:t,content:n})},goToNext:()=>{""!==t?""!==n?t.length>50?alert(g.$B.ERROR.TITLE_INVALIDATION):e.changeState():alert(g.$B.ERROR.WRITE_CONTENT):alert(g.$B.ERROR.WRITE_TITLE)}})]}),(0,h.jsx)(x,{children:(0,h.jsx)(u,{children:(0,h.jsx)("textarea",{style:(d=e.color,{paddingRight:10,border:"none",width:"100%",height:"100%",resize:"none",outline:"none",fontSize:17,boxSizing:"border-box",backgroundColor:d,color:"#121212"===d?"white":"black"}),onChange:e=>{i(e.target.value),a(e.target.value.length)},maxLength:1e4})})}),1e4===l?(0,h.jsxs)(b,{style:{color:"red"},children:[l,"/10000"]}):(0,h.jsxs)(b,{children:[l,"/10000"]})]});var d},T=(0,i.ZP)(l.Z)({width:"100%",height:"100%",display:"flex",flexDirection:"column",padding:"0 3%",boxSizing:"border-box",marinTop:"-30px"}),C=(0,i.ZP)(d.Z)({fontSize:18,fontWeight:"bolder",textAlign:"center",marginBottom:30}),v=e=>{const t=(0,n.s0)();return(0,h.jsxs)(T,{children:[(0,h.jsx)(c.Z,{postMainNovel:e.postMainNovel,type:g.cO.BUTTON.BASIC,backgroundColor:g.r$.WHITE,color:"#121212"===e.color?g.r$.WHITE:g.r$.BLACK,name:g.GP.BUTTONS.SUBMIT,margin:"10px -5px 0px auto",navigate:()=>t("/author_myNovel")}),(0,h.jsx)(C,{children:g.$B.WRITE_NOVEL_INTRO}),(0,h.jsx)("textarea",{style:(o=e.color,{width:"100%",height:"80%",resize:"none",outline:"none",borderRadius:10,padding:20,fontSize:15,boxSizing:"border-box",marginBottom:20,backgroundColor:o,color:"#121212"===o?"white":"black"}),onChange:t=>{e.setDescription(t.target.value)}})]});var o};var f=o(1024),S=o(941),Z=o(472);const j=(0,i.ZP)(l.Z)({width:"80%",display:"flex",flexDirection:"column",margin:"0 auto"}),y=(0,i.ZP)(l.Z)({flexGrow:1,width:"100%",margin:"0 auto",display:"flex",flexWrap:"wrap",boxSizing:"border-box"}),N=(0,i.ZP)(l.Z)({display:"flex",minHeight:40}),k=()=>{const[e,t]=(0,r.useState)([]),[o,i]=(0,r.useState)([]),[l,d]=(0,r.useState)(JSON.parse(localStorage.getItem("profile"))),[s,p]=(0,r.useState)(!0),[x,u]=(0,r.useState)("complete"),[_,b]=(0,r.useState)(!1),[T,C]=(0,r.useState)(""),[k,I]=(0,r.useState)("#ffffff"),[w,O]=(0,r.useState)({title:null,content:null,description:null,created_user:l.login_id});(0,r.useEffect)((()=>{B()}),[]);const B=()=>{(0,Z.Yu)("novel/getNovels",{user_id:l.login_id}).then((e=>{t(e.filter((e=>e.main_author_id===l.login_id||e.sub_author_id===l.login_id)))})).catch((e=>{console.log(e)}))},R=()=>{(0,Z.Yu)("novel/getAuthorNovel",{created_user:l.login_id,login_id:l.login_id}).then((function(e){i(e.novel_data)})).catch((e=>{console.log(e)}))},E=(0,n.s0)(),z=e=>{E("/novel_detail",{state:{props:e}})},L=()=>{b(!1)},W=()=>"authorWriteNov"===T?(0,h.jsx)(m,{setTitleContent:e=>(e=>{O((t=>({...t,title:e.title,content:e.content})))})(e),changeState:()=>C("authorWriteIntro"),color:k}):"authorWriteIntro"===T?(0,h.jsx)(v,{setDescription:e=>(e=>{O((t=>({...t,description:e})))})(e),regditMainNovData:w,profile:l,postMainNovel:()=>{0!==w.description.length?w.description.length>=100?alert(g.$B.ERROR.DESC_INVALIDATION):(0,Z.qC)("novel/postMainNovel",{title:w.title,content:w.content,description:w.description,created_user:l.login_id}).then((e=>{alert(e),L(),R()})).catch((e=>{console.log(e)})):alert(g.$B.ERROR.WRITE_DESCRIPTION)},color:k}):void 0;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(j,{children:[(0,h.jsxs)(N,{children:[(0,h.jsx)(c.Z,{type:g.cO.BUTTON.BASIC,backgroundColor:g.r$.WHITE,color:g.r$.BLACK,fontWeight:"complete"===x&&"bolder",name:g.GP.BUTTONS.COMPLETE,isComplete:()=>p(!0),setSelectedTab:()=>u("complete"),getMyCompleteNovel:B,padding:0}),(0,h.jsx)("span",{style:{paddingTop:8,marginLeft:8,marginRight:8,display:"inline-block"},children:"|"}),(0,h.jsx)(c.Z,{type:g.cO.BUTTON.BASIC,backgroundColor:g.r$.WHITE,color:g.r$.BLACK,fontWeight:"incomplete"===x&&"bolder",name:g.GP.BUTTONS.IN_COMPLETE,isComplete:()=>p(!1),setSelectedTab:()=>u("incomplete"),getMyIncompleteNovel:R,padding:0}),(0,h.jsx)("span",{style:{paddingTop:8,marginLeft:8,marginRight:8,display:"inline-block"},children:"|"}),(0,h.jsx)(c.Z,{type:g.cO.BUTTON.BASIC,backgroundColor:g.r$.WHITE,color:g.r$.BLACK,name:g.GP.BUTTONS.WRITE_NOVEL,padding:0,popupChange:W,showModal:()=>{b(!0)},changeState:()=>C("authorWriteNov")})]}),(0,h.jsxs)(y,{children:[o&&!1===s&&o.map((e=>(0,h.jsx)(a.Z,{title:e.title,description:e.description,created_date:e.created_date,created_user:e.created_user,cover_image:e.cover_image,onClick:()=>z(e)},e.main_seqno))),e&&s&&e.map((e=>(0,h.jsx)(a.Z,{title:e.complete_novel_title,genre_1:e.genre_1,genre_2:e.genre_2,keyword_1:e.keyword_1,keyword_2:e.keyword_2,keyword_3:e.keyword_3,genre_1_color:e.genre_1_color,genre_2_color:e.genre_2_color,keyword_1_color:e.keyword_1_color,keyword_2_color:e.keyword_2_color,keyword_3_color:e.keyword_3_color,description:e.description,like_count:e.like_count,created_date:e.created_date,cover_image:e.cover_image,onClick:()=>z(e)},e.complete_seqno)))]})]}),(0,h.jsx)(f.Z,{fullWidth:!0,open:_,width:(0,S.Q$)(T),onClose:L,height:(0,S.cM)(T),mode:(0,S.ne)(T),setColor:e=>I(e),setColorInit:()=>I("#ffffff"),children:W()})]})}},6739:(e,t,o)=>{o.d(t,{Z:()=>i});var r=o(9201),n=o(184);const i=(0,r.Z)((0,n.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close")},4361:(e,t,o)=>{o.d(t,{Z:()=>i});var r=o(9201),n=o(184);const i=(0,r.Z)((0,n.jsx)("path",{d:"m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"}),"Favorite")},690:(e,t,o)=>{o.d(t,{Z:()=>i});var r=o(9201),n=o(184);const i=(0,r.Z)((0,n.jsx)("path",{d:"M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"}),"FavoriteBorder")},2637:(e,t,o)=>{o.d(t,{Z:()=>i});var r=o(9201),n=o(184);const i=(0,r.Z)([(0,n.jsx)("circle",{cx:"4.5",cy:"9.5",r:"2.5"},"0"),(0,n.jsx)("circle",{cx:"9",cy:"5.5",r:"2.5"},"1"),(0,n.jsx)("circle",{cx:"15",cy:"5.5",r:"2.5"},"2"),(0,n.jsx)("circle",{cx:"19.5",cy:"9.5",r:"2.5"},"3"),(0,n.jsx)("path",{d:"M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"},"4")],"Pets")},2167:(e,t,o)=>{o.d(t,{Z:()=>i});var r=o(9201),n=o(184);const i=(0,r.Z)((0,n.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search")},8990:(e,t,o)=>{o.d(t,{Z:()=>i});var r=o(9201),n=o(184);const i=(0,r.Z)((0,n.jsx)("path",{d:"M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z"}),"ThumbUpAlt")},4075:(e,t,o)=>{o.d(t,{Z:()=>i});var r=o(9201),n=o(184);const i=(0,r.Z)((0,n.jsx)("path",{d:"m13.11 5.72-.57 2.89c-.12.59.04 1.2.42 1.66.38.46.94.73 1.54.73H20v1.08L17.43 18H9.34c-.18 0-.34-.16-.34-.34V9.82l4.11-4.1M14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.83C7 18.95 8.05 20 9.34 20h8.1c.71 0 1.36-.37 1.72-.97l2.67-6.15c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2zM4 9H2v11h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1z"}),"ThumbUpOffAlt")}}]);
//# sourceMappingURL=503.01157a10.chunk.js.map