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
decimal [0-9]+("."[0-9]+)
stringliteral (\"[^"]*\")                  // FALTA ARREGLAR EL CASO DE COMILLAS ADENTRO DE COMILLAS 
caracter (\'[^"]\')


id ([a-zA-Z_])[a-zA-Z0-9_]*



%%

\s+ /* skip whitespace */
[ \t\r\n\f] %{ /*se ignoran*/ %}
\n                  {}
"/""/".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas




{caracter}            return 'caracter'

{decimal}             return 'decimal'
{entero}              {;return 'entero'} 
{stringliteral}       return 'STRING_LITERAL'
{comentarioBloque}    {console.log("comBloque reconocido");return 'comentarioBloque'}
{comentarioLinea}     {console.log("comLinea reconocido"); return 'comentarioLinea'}
":"                   return ':'
"/"                   return '/'
";"                   return ';'
"--"                  {console.log("decremento");return 'decremento'}
"-"                   return '-'
"++"                 {console.log("incremento"); return 'incremento'}
"+"                   return '+'
"*"                   return '*'
"^"                   return '^'
"%"                   return '%'
"."                   return '.'

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


","                   return ','
"("                   return '('
")"                   return ')'  

"{"                   return '{'
"}"                   return '}'

"main"                return 'main'
"println"             return 'println'
"print"               return 'print'
"out"                 return 'out' 
"System"              return 'System'
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
"class"              {console.log("viene class :v"); return 'class'}
"import"              return 'import'
"char"                return 'char'
"double"              return 'double'  
"int"                 return 'int'
"String"              return 'String'
"boolean"             return 'boolean'
{id}                  return 'id'
<<EOF>>	          return 'EOF'

.                       { console.error('Este es un error léxico: ' + yytext + '  en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex


%left 'else'
%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/'
%left '^' '%'
%right '!'
%left UMENOS

%start INICIO

%%

/*NECESITA AL MENOS TOKENS Y UN ESTADO DE INICIO PARA COMPILAR CON LE COMANDO jison nombreArchivo.jison */


/*
*PARA CREAR LA GRAMATICA NECESITO COMO SABER QUE 
*JISON ACEPTA AMBIGUEDAD 
*LA GRAMATICA TIENE QUE SER ASCENDENTE 
*/

INICIO :  LISTA_IMPORTE LISTA_CLASES EOF {$$ = new Tree($1); return $$;}
       |  LISTA_CLASES EOF {$$ = new Tree($1); return $$;}
       | EOF {$$ = new Tree($1); return $$;}
       ;

LISTA_IMPORTE: LISTA_IMPORTE IMPORTE
      	 | IMPORTE 
        | epsilon 
        ; 

IMPORTE: 'import' 'id' ';'   {console.log("venia un importe");}
       ;
       
LISTA_CLASES: LISTA_CLASES SENTENCIA_CLASE
            | SENTENCIA_CLASE
            ;


                                   // POR EL MOMENTO SON INSTRUCCIONES PERO DEBE DE SER LISTA_DECLARACIONES_METFUNVAR 
SENTENCIA_CLASE:'class' 'id' BLOQUE_DECLARACIONES_METFUNVAR
               | error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }   
               ;



BLOQUE_DECLARACIONES_METFUNVAR : '{' LISTA_DECLARACIONES_METFUNVAR '}' {$$ = $2;}              /* este es para que acepte vacios*/
                               | '{' '}' {$$ = [];}
                               | error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }   
                               ;

LISTA_DECLARACIONES_METFUNVAR: DECLARACION_AMBITO_CLASE LISTA_DECLARACIONES_METFUNVAR_P
                             | error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }   
                             ;

LISTA_DECLARACIONES_METFUNVAR_P: DECLARACION_AMBITO_CLASE LISTA_DECLARACIONES_METFUNVAR_P
                               |{}
                               ;      

                 




INSTRUCCIONES : INSTRUCCIONES INSTRUCCION
              | INSTRUCCION           
              |  error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
              ;

INSTRUCCION : SENTENCIAIMPRIME     {$$ = $1;}
            | WHILE              { /*console.log("ESTA EN UN WHILE"); */}
            | IF                    {$$ = $1;}
            | DOWHILE
            | SENTENCIA_FOR
            | SENTENCIA_SWITCH
            | ASIGNACION_SIMPLE
            | DECLARACION_ADENTRO_DE_METODOS_FUNCIONES
            ;
TIPO : 'int' {$$ = new Type(types.NUMERIC); console.log("TIPO INT"); }
     | 'String' {$$ = new Type(types.STRING); console.log("TIPO STRING")}
     | 'boolean' {$$ = new Type(types.BOOLEAN);}
     | 'double'
     | 'char'
     ;


SENTENCIA_FOR:'for' '(' DEC_for ';' EXPRESION ';' INCRE_DECRE ')' BLOQUE_INSTRUCCIONES {console.log("sentencia_for");}
             ;

DEC_for: TIPO 'id' '=' EXPRESION
       | 'id' '=' EXPRESION
       ;
INCRE_DECRE: 'id' 'incremento'  {console.log("incre_decre");}
           | 'id' 'decremento' {console.log("incre_decre");}
           ;


DOWHILE: 'do' BLOQUE_INSTRUCCIONES 'while' CONDICION ';'
       ;

SENTENCIAIMPRIME: 'System' '.' 'out' '.'  OPCIONIMPRIME '(' EXPRESION ')' ';'
                ;


OPCIONIMPRIME : 'println'
	       | 'print'
              ; 


PRINT : 'print' '(' EXPRESION ')' ';' { $$ = new Print($3, _$.first_line, _$.first_column);}
      ;

WHILE : 'while' CONDICION BLOQUE_INSTRUCCIONES {$$ = new While($2, $3, _$.first_line, _$.first_column);}
      ;

IF : 'if' CONDICION BLOQUE_INSTRUCCIONES {$$ = new If($2, $3, [], _$.first_line, _$.first_column); console.log("if acept");}
   | 'if' CONDICION BLOQUE_INSTRUCCIONES 'else' BLOQUE_INSTRUCCIONES {$$ = new If($2, $3, $5, _$.first_line, _$.first_column);}
   | 'if' CONDICION BLOQUE_INSTRUCCIONES 'else' IF {$$ = new If($2, $3, [$5], _$.first_line, _$.first_column);}
   ;



CONDICION : '(' EXPRESION ')' {$$ = $2;}
          ;




BLOQUE_INSTRUCCIONES : '{' INSTRUCCIONES '}' {$$ = $2;}              /* este es para que acepte vacios*/
                     | '{' '}'    {$$ = [];}
                     ;
      
EXPRESION : '-' EXPRESION %prec UMENOS	    { $$ = new Arithmetic($1, null, '-', _$.first_line, _$.first_column); }
          | '!' EXPRESION	                { $$ = new Arithmetic($1, null, '!', _$.first_line, _$.first_column); }
          | EXPRESION '+' EXPRESION		    { $$ = new Arithmetic($1, $3, '+', _$.first_line, _$.first_column); }
          | EXPRESION '-' EXPRESION		    { $$ = new Arithmetic($1, $3, '-', _$.first_line, _$.first_column); }
          | EXPRESION '*' EXPRESION		    { $$ = new Arithmetic($1, $3, '*', _$.first_line, _$.first_column); }
          | EXPRESION '/' EXPRESION	          { $$ = new Arithmetic($1, $3, '/', _$.first_line, _$.first_column); }
          | EXPRESION '<' EXPRESION		    { $$ = new Relational($1, $3, '<', _$.first_line, _$.first_column); }
          | EXPRESION '>' EXPRESION		    { $$ = new Relational($1, $3, '>', _$.first_line, _$.first_column); }
          | EXPRESION '>=' EXPRESION	    { $$ = new Relational($1, $3, '>=', _$.first_line, _$.first_column); }
          | EXPRESION '<=' EXPRESION	    { $$ = new Relational($1, $3, '<=', _$.first_line, _$.first_column); }
          | EXPRESION '==' EXPRESION	    { $$ = new Relational($1, $3, '==', _$.first_line, _$.first_column); }
          | EXPRESION '!=' EXPRESION	    { $$ = new Relational($1, $3, '!=', _$.first_line, _$.first_column); }
          | EXPRESION '||' EXPRESION	    { $$ = new Logic($1, $3, '&&', _$.first_line, _$.first_column); }
          | EXPRESION '&&' EXPRESION	    { $$ = new Logic($1, $3, '||', _$.first_line, _$.first_column); }
          | 'decimal'				    { $$ = new Primitive(new Type(types.NUMERIC), Number($1), _$.first_line, _$.first_column); }
          | 'true'				    { $$ = new Primitive(new Type(types.BOOLEAN), true, _$.first_line, _$.first_column); }
          | 'false'				    { $$ = new Primitive(new Type(types.BOOLEAN), false, _$.first_line, _$.first_column); }
          | STRING_LITERAL			    { $$ = new Primitive(new Type(types.STRING), $1.replace(/\"/g,""), _$.first_line, _$.first_column); }
          | id EXPRESION_METODO		          { /*console.log("VIENE ID ");*/ }
          | caracter                           {/*console.log("caracter");*/}
          | entero                              {console.log("ENTERO");}
          | '(' EXPRESION ')'		          { $$ = $2; }
          ;


SENTENCIA_SWITCH: 'switch' '(' EXPRESION ')' BLOQUE_CASES
                ;
              
BLOQUE_CASES:  '{' LISTACASES OPCIONDEFAULT '}'                      {$$ = $2;}    
            | '{' '}'    {$$ = [];}
            ;
        
OPCIONDEFAULT:'default' ':' BLOQUEINST_CON_OPCION_VACIA  SENTENCIA_BREAK
             | {} 
             ;

LISTACASES: LISTACASES CASES_P
          | CASES_P
          ;
CASES_P :'case' EXPRESION ':' BLOQUEINST_CON_OPCION_VACIA SENTENCIA_BREAK
        ;

SENTENCIA_BREAK: 'break' ';'
               ;

BLOQUEINST_CON_OPCION_VACIA:  INSTRUCCIONES
                            | {}
                            ;


ASIGNACION_SIMPLE: 'id' OPCION_ASIGNACION
                 ;


OPCION_ASIGNACION: '=' EXPRESION ';'
                 | '(' SENTENCIA_LLAMA_METODO ';'  
                 ;

EXPRESION_METODO: '(' SENTENCIA_LLAMA_METODO 
                | {}
                ;


SENTENCIA_LLAMA_METODO : LISTA_EXPRESIONES_LLAMADA_METODO ')'
		          | ')'
                        ;

LISTA_EXPRESIONES_LLAMADA_METODO :EXPRESION  LISTA_EXPRESIONES_LLAMADA_METODOP 
                                 ;
LISTA_EXPRESIONES_LLAMADA_METODOP:LISTA_EXPRESIONES_LLAMADA_METODOP ',' EXPRESION 
                                 | ',' EXPRESION 
                                 | error { console.error('Este es un error sintáctico: [ ' + yytext + ' ] en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
                                 ;


DECLARACION_ADENTRO_DE_METODOS_FUNCIONES: TIPO 'id' DECLARACION_ADENTRO_DE_METODOS_FUNCIONESP
                                        ;

DECLARACION_ADENTRO_DE_METODOS_FUNCIONESP: LISTA_IDS ASIGNACION 
                                         ;        
LISTA_IDS:',' 'id' LISTA_IDS
         |{}
         ; 


ASIGNACION: '=' EXPRESION ';'
          | ';'
          ;



OPCION_ID_MAIN: 'main'  {console.log("tiene un metodo main :o");}
              | 'id'
              ;

DECLARACION_AMBITO_CLASE: 'void' OPCION_ID_MAIN '(' OPCION_METODO_FUNCION
                        | TIPO 'id' DECLARACION_AMBITO_CLASEP
                        ; 

DECLARACION_AMBITO_CLASEP: '(' OPCION_METODO_FUNCION   {console.log("funcion");}
                         | LISTA_IDS ASIGNACION 
                         ;


OPCION_METODO_FUNCION: TIPO 'id'  LISTA_PARAMETROS_CON_TIPO ')' BLOQUE_INSTRUCCIONES    {console.log("CON PARAMETROS");}                                 
                     |')' BLOQUE_INSTRUCCIONES     {console.log("SIN PARAMETROS ");}
                     ;
                                   
LISTA_PARAMETROS_CON_TIPO : ','  TIPO 'id'  LISTA_PARAMETROS_CON_TIPO
			   | {/*EPSILON*/}
                        ;
                        





/*AUN NO SE COMO LLAMARLAS EN EL MOMENTO PRECISO*/

SENTENCIA_CONTINUE: 'continue' ';'
                  ;
SENTENCIA_RETURN_METODO: 'return' ';'
                        ;
SENTENCIA_RETURN_FUNCION: 'return' EXPRESION ';'
                         ;
SENTENCIA_BREAK_CON_CICLO: 'break' ';'
                         ; 