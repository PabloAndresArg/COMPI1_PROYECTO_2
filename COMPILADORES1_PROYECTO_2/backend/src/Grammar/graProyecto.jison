%{
  /* cada importe es un NODO del arbol ATS
   el patron interprete dice que se tiene que crear todo modular una clase por nodo */
    const {Primitive} = require('../Expresiones/Primitive');
    const {Arithmetic} = require('../Expresiones/Arithmetic');
    const {Relational} = require('../Expresiones/Relational');
    const {Continue} = require('../Expresiones/Continue');
    const {Break} = require('../Expresiones/Break');
    const {Logic} = require('../Expresiones/Logic');
    const {Identificador} = require('../Expresiones/Identificador');
    const {Print} = require('../Instrucciones/Print');
    const {If} = require('../Instrucciones/If');
    const {While} = require('../Instrucciones/While');
    const {Declaracion} = require('../Instrucciones/Declaracion');
    const {Asignacion} = require('../Instrucciones/Asignacion');
    const {Excepcion} = require('../utils/Exception');
    const {Type, types} = require('../utils/Type');
    const {Tree} = require('../Simbols/Tree');
    const {tacos} = require('../Expresiones/tacos');
    console.log("se ejecuto el jison");

%}

%lex
%options case-sensitive
entero [0-9]+
decimal {entero}("."{entero})?
stringliteral (\"[^"]*\")                  // FALTA ARREGLAR EL CASO DE COMILLAS ADENTRO DE COMILLAS 
caracter (\'[^"]\')
id ([a-zA-Z_])[a-zA-Z0-9_]*
/*FALTA COMENTARIOS BLOQUE Y DE LINEA */


%%

\s+ /* skip whitespace */
/* Espacios en blanco */
[ \r\t]+            {}
\n                  {}





{caracter}            return 'caracter'
{decimal}             return 'decimal' 
{stringliteral}       return 'STRING_LITERAL'


"/"                   return '/'
";"                   return ';'
"--"                  {console.log("decremento");return 'decremento'}
"-"                   return '-'
"++"                 {console.log("incremento"); return 'incremento'}
"+"                   return '+'
"*"                   return '*'
"^"                   return '^'
"%"                   return '%'


"<"                   return '<'
">"                   return '>'
"<="                  return '<='
">="                  return '>='
"=="                  return '=='
"!="                  return '!='
"||"                  return '||'
"&&"                  return '&&'
"!"                   return '!'
"="                   return '='

"("                   return '('
")"                   return ')'  

"{"                   return '{'
"}"                   return '}'

"void"                return 'void'
"return"              return 'return'
"if"                  return 'if'
"else"                return 'else'
"switch"              return 'switch'
"case"                return 'case'
"default"             return 'default' 
"break"               return 'break'
"continue"            return 'continue'
"while"               return 'while'
"do"                  return 'do'
"for"                 return 'for'
"false"               return 'false'
"true"                return 'true'
"class"               return 'class'
"import"              return 'import'
"char"                return 'char'
"double"              return 'double'  
"int"                 return 'int'
"String"              return 'string'
"boolean"             return 'boolean'
{id}                  return 'id'
<<EOF>>	          return 'EOF'

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex


%left 'else'
%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/'
%right '!'
%left UMENOS

%start INICIO

%%

/*NECESITA AL MENOS TOKENS Y UN ESTADO DE INICIO PARA COMPILAR CON LE COMANDO jison nombreArchivo.jison */



INICIO : INSTRUCCIONES EOF {$$ = new Tree($1); return $$;}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION { $$ = $1; $$.push($2); }
              | INSTRUCCION               { $$ = [$1]; }
              ;

INSTRUCCION : PRINT {$$ = $1;}
            | 'tacos' ';'{$$ = new tacos($1, _$.first_line, _$.first_column);console.log("instruccion TACOS\n \n \n");}
            | error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
            ;


PRINT : 'print' '(' EXPRESION ')' ';' { $$ = new Print($3, _$.first_line, _$.first_column);}
      ;
      
EXPRESION :
          | EXPRESION '+' EXPRESION { $$ = new Arithmetic($1 , $3, '+' , _$.first_line , _$.first_column); }
          | STRING_LITERAL			    { $$ = new Primitive(new Type(types.STRING), $1.replace(/\"/g,""), _$.first_line, _$.first_column); }
          | identifier			          { /*console.log("VIENE ID ");*/ }
          | caracter                           {console.log("caracter");}
          | '(' EXPRESION ')'		          { $$ = $2; }
          ;

