"use strict";(self.webpackChunkreact_stellar_burgers=self.webpackChunkreact_stellar_burgers||[]).push([[132],{820:function(e,t,s){s.d(t,{C:function(){return g}});var r=s(7689),a=s(1087),n=s(8491),c=s(3266),i=s(6814),d=s(2791),l="feed-order-images_container__uPktB",o="feed-order-images_item__IVYlW",_="feed-order-images_image__FN1xE",m="feed-order-images_more__BCfBW",x=s(184),u=function(e){var t=e.ingredients,s=(0,d.useMemo)((function(){return t.length-6}),[t]);return(0,x.jsx)("div",{className:l,children:t.slice(0,6).map((function(e,t){return(0,x.jsx)("div",{className:o,style:{zIndex:6-t},children:(0,x.jsxs)("div",{className:_,children:[(0,x.jsx)("img",{src:e.image_mobile,alt:e.name,style:{opacity:5===t&&s>0?"0.3":"1"}},e._id),5===t&&s>0&&(0,x.jsxs)("span",{className:"text text_type_main-default ".concat(m),children:["+",s]})]})},e._id)}))})},f="feed-order-item_order_item__OZ7Ko",p="feed-order-item_header__cRoyr",h="feed-order-item_footer__4DJmd",j="feed-order-item_total_price__a5MDC",g=function(e){var t=e.order,s=e.target,d=e.showStatus,l=void 0===d||d,o=(0,r.TH)();return(0,x.jsxs)(a.rU,{to:"".concat(s,"/").concat(t.number),className:f,state:{prevLocation:o},children:[(0,x.jsxs)("div",{className:p,children:[(0,x.jsxs)("p",{className:"text text_type_digits-default text_color_primary",children:["#",t.number]}),(0,x.jsx)("p",{className:"text text_type_main-default text_color_inactive",children:(0,c.c)(t.createdAt)})]}),(0,x.jsx)("p",{className:"text text_type_main-medium text_color_primary pb-2",children:t.name}),l&&(0,x.jsx)("p",{className:"text text_type_main-default ".concat(t.status===n.iF.done?"text_color_success":"text_color_primary"," pb-6"),children:n.O2[t.status]}),(0,x.jsxs)("div",{className:h,children:[(0,x.jsx)(u,{ingredients:t.ingredients}),(0,x.jsxs)("div",{className:j,children:[(0,x.jsx)("p",{className:"text text_type_digits-default text_color_primary mr-2",children:t.totalPrice}),(0,x.jsx)(i.rm,{type:"primary"})]})]})]})}},4132:function(e,t,s){s.r(t),s.d(t,{default:function(){return N}});var r=s(2791),a=s(1012),n=s(5096),c=s(820),i=s(8491),d=s(780),l=s(184),o=function(e){var t=e.orders;return(0,l.jsx)(r.Fragment,{children:t&&t.length?t.map((function(e){return(0,l.jsx)(c.C,{order:e,showStatus:!1,target:i.mD.FEED},e._id)})):(0,l.jsx)(d.Z,{})})},_=function(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")},m="feed-info_feed_info__NCvAO",x="feed-info_orders__ByvmB",u=function(e){var t=e.feed,s=function(e){var s=e.type,r=t.orders.filter((function(e){return s.includes(e.status)})).slice(0,10);return(0,l.jsx)("ul",{className:"text text_type_digits-default ".concat(s.includes(i.iF.done)&&"text_color_success"),children:r.map((function(e){return(0,l.jsx)("li",{children:e.number},e._id)}))})};return(0,l.jsx)(r.Fragment,{children:t&&t.orders.length?(0,l.jsxs)(r.Fragment,{children:[(0,l.jsxs)("div",{className:x,children:[(0,l.jsxs)("div",{className:"w-100 mr-4",children:[(0,l.jsx)("p",{className:"text text_type_main-medium pb-6",children:"\u0413\u043e\u0442\u043e\u0432\u044b:"}),(0,l.jsx)(s,{type:[i.iF.done]})]}),(0,l.jsxs)("div",{className:"w-100 ml-4",children:[(0,l.jsx)("p",{className:"text text_type_main-medium pb-6",children:"\u0412 \u0440\u0430\u0431\u043e\u0442\u0435:"}),(0,l.jsx)(s,{type:[i.iF.created,i.iF.pending]})]})]}),(0,l.jsxs)("div",{className:m,children:[(0,l.jsx)("p",{className:"text text_type_main-medium pt-15",children:"\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043e \u0437\u0430 \u0432\u0441\u0435 \u0432\u0440\u0435\u043c\u044f:"}),(0,l.jsx)("p",{className:"text text_type_digits-large",children:(0,l.jsx)("span",{children:_(t.total)})}),(0,l.jsx)("p",{className:"text text_type_main-medium pt-15",children:"\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043e \u0437\u0430 \u0441\u0435\u0433\u043e\u0434\u043d\u044f:"}),(0,l.jsx)("p",{className:"text text_type_digits-large",children:(0,l.jsx)("span",{children:_(t.totalToday)})})]})]}):(0,l.jsx)(d.Z,{})})},f=s(1901),p="page-feed_container__qjNgZ",h="page-feed_blocks__gJkqh",j="page-feed_left__Ax3BB",g="page-feed_right__fiSL2",N=function(){var e=(0,a.TL)(),t=(0,a.CG)((function(e){return e.feed}));return(0,r.useEffect)((function(){return t.connected||e((0,n.tB)()),function(){e((0,n.xq)())}}),[e]),t.message?(0,l.jsx)(f.Z,{}):(0,l.jsx)(r.Fragment,{children:(0,l.jsxs)("div",{className:p,children:[(0,l.jsx)("p",{className:"text text_type_main-large w-100",children:"\u041b\u0435\u043d\u0442\u0430 \u0437\u0430\u043a\u0430\u0437\u043e\u0432"}),(0,l.jsxs)("div",{className:h,children:[(0,l.jsx)("section",{className:j,children:(0,l.jsx)(o,{orders:t.orders})}),(0,l.jsx)("section",{className:g,children:(0,l.jsx)(u,{feed:t})})]})]})})}},3266:function(e,t,s){s.d(t,{c:function(){return r}});var r=function(e){var t,s=new Date,r=new Date(e);switch(Math.round((+s-+r)/864e5)){case 0:t="\u0421\u0435\u0433\u043e\u0434\u043d\u044f";break;case 1:t="\u0412\u0447\u0435\u0440\u0430";break;case 2:t="\u041f\u043e\u0437\u0430\u0432\u0447\u0435\u0440\u0430";break;case 3:t="3 \u0434\u043d\u044f \u043d\u0430\u0437\u0430\u0434";break;default:t="".concat(("0"+r.getDate()).slice(-2),".").concat(("0"+(+r.getMonth()+1).toString()).slice(-2),".").concat(r.getFullYear())}var a="".concat(("0"+r.getHours()).slice(-2),":").concat(("0"+r.getMinutes()).slice(-2));return"".concat(t,", ").concat(a)}}}]);
//# sourceMappingURL=132.971b857c.chunk.js.map