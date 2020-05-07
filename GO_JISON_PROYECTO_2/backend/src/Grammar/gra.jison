%{  
        // importes 

%}

%lex
%options case-sensitive
entero [0-9]+
decimal {entero}("."{entero})?
stringliteral (\"[^"]*\")                  // FALTA ARREGLAR EL CASO DE COMILLAS ADENTRO DE COMILLAS 
caracter (\'[^"]\')
id ([a-zA-Z_])[a-zA-Z0-9_]*
//caracter (['].[].['])
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



"char"                return 'char'
"double"              return 'double'  
"int"                 return 'int'
"String"              return 'string'
"boolean"             return 'boolean'
{id}                  return 'id'
<<EOF>>	              return 'EOF'

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO'
%left UMENOS

%start inicio


%% /* Definición de la gramática */

inicio:instrucciones EOF
       ;

instrucciones: instruccion instrucciones
	| instruccion
	//| error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
       ;


EXPRESION :
          | EXPRESION '+' EXPRESION { $$ = new Arithmetic($1 , $3, '+' , _$.first_line , _$.first_column); }
          | STRING_LITERAL			    { $$ = new Primitive(new Type(types.STRING), $1.replace(/\"/g,""), _$.first_line, _$.first_column); }
          | id			          { /*console.log("VIENE ID ");*/ }
          | caracter                           {console.log("caracter");}
          | '(' EXPRESION ')'		          { $$ = $2; }
          ;