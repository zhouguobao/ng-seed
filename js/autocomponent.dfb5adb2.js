webpackJsonp([14,19],{qgun:function(n,t,e){function r(n){function t(n,t){return t=t||0,Math.floor(Math.random()*(n-t+1))+t}function e(e){return n.when(new Array(t(5)).join(".").split(".").map(function(n,r){return{query:e,category:e+r,count:t(200,100)}}))}var r=this;r.results=[],r.value=null,r.handleChange=function(){return e(r.keyword)},r.select=function(n){r.value=n.item}}r.$inject=["$q"];var o=e("eslX");o.registerController("AutoComponentCtrl",r)}});