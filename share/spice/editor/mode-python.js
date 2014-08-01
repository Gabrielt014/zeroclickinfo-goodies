define("ace/mode/python",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/python_highlight_rules","ace/mode/folding/pythonic","ace/range"],function(e,t,n){var r=e("../lib/oop");var i=e("./text").Mode;var s=e("../tokenizer").Tokenizer;var o=e("./python_highlight_rules").PythonHighlightRules;var u=e("./folding/pythonic").FoldMode;var a=e("../range").Range;var f=function(){this.HighlightRules=o;this.foldingRules=new u("\\:")};r.inherits(f,i);(function(){this.lineCommentStart="#";this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t);var i=this.getTokenizer().getLineTokens(t,e);var s=i.tokens;if(s.length&&s[s.length-1].type=="comment"){return r}if(e=="start"){var o=t.match(/^.*[\{\(\[\:]\s*$/);if(o){r+=n}}return r};var e={pass:1,"return":1,raise:1,"break":1,"continue":1};this.checkOutdent=function(t,n,r){if(r!=="\r\n"&&r!=="\r"&&r!=="\n")return false;var i=this.getTokenizer().getLineTokens(n.trim(),t).tokens;if(!i)return false;do{var s=i.pop()}while(s&&(s.type=="comment"||s.type=="text"&&s.value.match(/^\s+$/)));if(!s)return false;return s.type=="keyword"&&e[s.value]};this.autoOutdent=function(e,t,n){n+=1;var r=this.$getIndent(t.getLine(n));var i=t.getTabString();if(r.slice(-i.length)==i)t.remove(new a(n,r.length-i.length,n,r.length))}}).call(f.prototype);t.Mode=f});define("ace/mode/python_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){var r=e("../lib/oop");var i=e("./text_highlight_rules").TextHighlightRules;var s=function(){var e="and|as|assert|break|class|continue|def|del|elif|else|except|exec|"+"finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|"+"raise|return|try|while|with|yield";var t="True|False|None|NotImplemented|Ellipsis|__debug__";var n="abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|"+"eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|"+"binfile|iter|property|tuple|bool|filter|len|range|type|bytearray|"+"float|list|raw_input|unichr|callable|format|locals|reduce|unicode|"+"chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|"+"cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|"+"__import__|complex|hash|min|set|apply|delattr|help|next|setattr|"+"buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern";var r=this.createKeywordMapper({"invalid.deprecated":"debugger","support.function":n,"constant.language":t,keyword:e},"identifier");var i="(?:r|u|ur|R|U|UR|Ur|uR)?";var s="(?:(?:[1-9]\\d*)|(?:0))";var o="(?:0[oO]?[0-7]+)";var u="(?:0[xX][\\dA-Fa-f]+)";var a="(?:0[bB][01]+)";var f="(?:"+s+"|"+o+"|"+u+"|"+a+")";var l="(?:[eE][+-]?\\d+)";var c="(?:\\.\\d+)";var h="(?:\\d+)";var p="(?:(?:"+h+"?"+c+")|(?:"+h+"\\.))";var d="(?:(?:"+p+"|"+h+")"+l+")";var v="(?:"+d+"|"+p+")";var m="\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"string",regex:i+'"{3}',next:"qqstring3"},{token:"string",regex:i+'"(?=.)',next:"qqstring"},{token:"string",regex:i+"'{3}",next:"qstring3"},{token:"string",regex:i+"'(?=.)",next:"qstring"},{token:"constant.numeric",regex:"(?:"+v+"|\\d+)[jJ]\\b"},{token:"constant.numeric",regex:v},{token:"constant.numeric",regex:f+"[lL]\\b"},{token:"constant.numeric",regex:f+"\\b"},{token:r,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"},{token:"text",regex:"\\s+"}],qqstring3:[{token:"constant.language.escape",regex:m},{token:"string",regex:'"{3}',next:"start"},{defaultToken:"string"}],qstring3:[{token:"constant.language.escape",regex:m},{token:"string",regex:"'{3}",next:"start"},{defaultToken:"string"}],qqstring:[{token:"constant.language.escape",regex:m},{token:"string",regex:"\\\\$",next:"qqstring"},{token:"string",regex:'"|$',next:"start"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:m},{token:"string",regex:"\\\\$",next:"qstring"},{token:"string",regex:"'|$",next:"start"},{defaultToken:"string"}]}};r.inherits(s,i);t.PythonHighlightRules=s});define("ace/mode/folding/pythonic",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode"],function(e,t,n){var r=e("../../lib/oop");var i=e("./fold_mode").FoldMode;var s=t.FoldMode=function(e){this.foldingStartMarker=new RegExp("([\\[{])(?:\\s*)$|("+e+")(?:\\s*)(?:#.*)?$")};r.inherits(s,i);(function(){this.getFoldWidgetRange=function(e,t,n){var r=e.getLine(n);var i=r.match(this.foldingStartMarker);if(i){if(i[1])return this.openingBracketBlock(e,i[1],n,i.index);if(i[2])return this.indentationBlock(e,n,i.index+i[2].length);return this.indentationBlock(e,n)}}}).call(s.prototype)})