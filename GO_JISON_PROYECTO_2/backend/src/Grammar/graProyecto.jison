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
    const {Importe} = require('../Otros/Importe');
    const {ClaseInstruccion} = require('../Otros/ClaseInstruccion');
    const {Inicio} = require('../Otros/Inicio');
    const {Declaracion_ambito_clase} = require('../Otros/Inicio');
    const {Return_metodo} = require('../Instrucciones/Return_metodo');
    const {Return_funcion} = require('../Instrucciones/Return_funcion');



    var esta_en_un_ciclo = false;
    var esta_en_un_metodo = false ; 
    var esta_en_una_funcion = false; 
  
%}

%lex
%options case-sensitive
no  ([\"]*)
entero [0-9]+
decimal [0-9]+("."[0-9]+)
caracter (\'[^☼]\')
stringliteral (\"[^☼]*[\\"]*\")                  // FALTA ARREGLAR EL CASO DE COMILLAS ADENTRO DE COMILLAS 


id ([a-zA-Z_])[a-zA-Z0-9_]*



%%

\s+ /* skip whitespace */
[ \t\r\n\f] %{ /*se ignoran*/ %}
\n                  {}
"/""/".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas




{caracter}            return 'caracter'

{decimal}             return 'decimal'
{entero}              return 'entero' 
{stringliteral}       {console.log("string LITERAL....");return 'STRING_LITERAL'}
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
"class"               return 'class'
"import"              return 'import'
"char"                return 'char'
"double"              return 'double'  
"int"                 return 'int'
"String"              return 'String'
"boolean"             return 'boolean'
{id}                  return 'id'
<<EOF>>	          return 'EOF'

.        {  console.error('Este es un error léxico: ' + yytext + '  en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
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
/*
INICIO : INSTRUCCIONES EOF{$$ = new Tree($1);console.log("se genera el arbol"); return $$;}
;
*/


INICIO : LISTA_IMPORTES_CLASES EOF {$$ = new Tree($1);console.log("se genera el arbol"); return $$;}
       |  LISTA_IMPORTE EOF {$$ = new Tree($1);console.log("se genera el arbol"); return $$;}
       |  LISTA_CLASES  EOF{$$ = new Tree($1);console.log("se genera el arbol"); return $$;}
       | EOF{$$ = new Tree($1);console.log("se genera el arbol"); return $$;}
       ;

LISTA_IMPORTES_CLASES:  LISTA_IMPORTE LISTA_CLASES {let init =  new Inicio($1, $2); $$ = init.Lista_importes_clases}
                     ;

LISTA_IMPORTE: LISTA_IMPORTE IMPORTE { $1.push($2); $$ = $1; }
      	 | IMPORTE    { $$ = [$1]; }
        ; 

LISTA_CLASES: LISTA_CLASES SENTENCIA_CLASE{ $1.push($2); $$ = $1; }
            | SENTENCIA_CLASE  { $$ = [$1]; }
            ;



IMPORTE: 'import' 'id' ';'   {$$ = new Importe($2, $2 ,  this._$.first_line, this._$.first_column); console.log('TOKEN:' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);}
       ;
       
//        BLOQUE_DECLARACIONES_METFUNVAR                       
SENTENCIA_CLASE:'class' 'id' BLOQUE_INSTRUCCIONES {$$ = new ClaseInstruccion($2, $3 ,  this._$.first_line, this._$.first_column);}
              | error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }  
               ;
               


BLOQUE_DECLARACIONES_METFUNVAR : '{' LISTA_DECLARACIONES_METFUNVAR '}' {$$ = $2;}              /* este es para que acepte vacios*/
                               | '{' '}' {$$ = [];}
                               | error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }   
                               ;

LISTA_DECLARACIONES_METFUNVAR: DECLARACION_AMBITO_CLASE LISTA_DECLARACIONES_METFUNVAR_P  { $$ = new Declaracion_ambito_clase($1 , $2);}
                             | error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }   
                             ;

LISTA_DECLARACIONES_METFUNVAR_P: DECLARACION_AMBITO_CLASE LISTA_DECLARACIONES_METFUNVAR_P
                               | {$$ = [];}
                               ;      

                 



INSTRUCCIONES : INSTRUCCIONES INSTRUCCION { $1.push($2); $$ = $1; }
              | INSTRUCCION               { $$ = [$1]; }
              |  error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
              ;

INSTRUCCION : SENTENCIAIMPRIME     {$$ = $1;}
            | WHILE                {$$ = $1;}
            | IF                   {$$ = $1;}
            | DOWHILE              {$$ = $1;}
            | SENTENCIA_FOR        {$$ = $1;}
            | SENTENCIA_SWITCH      {$$ = $1;}
            | ASIGNACION_SIMPLE     {$$ = $1;}
            | DECLARACION_ADENTRO_DE_METODOS_FUNCIONES    {$$ = $1;}
            | SENTENCIA_CONTINUE {$$ = $1;}
            | SENTENCIA_RETURN_FUNCION {$$ = $1;}
            | SENTENCIA_RETURN_METODO{$$ = $1;}
            ;
TIPO : 'int' {$$ = new Type(types.INT); console.log("TIPO INT"); }
     | 'String' {$$ = new Type(types.STRING); console.log("TIPO STRING")}
     | 'boolean' {$$ = new Type(types.BOOLEAN);}
     | 'double' {$$ = new Type(types.DOUBLE);}
     | 'char'{$$ = new Type(types.CHAR);}
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
          | '!' EXPRESION	                  { $$ = new Arithmetic($1, null, '!', _$.first_line, _$.first_column); }
          | EXPRESION '+' EXPRESION           { $$ = new Arithmetic($1, $3, '+', _$.first_line, _$.first_column); }
          | EXPRESION '-' EXPRESION           { $$ = new Arithmetic($1, $3, '-', _$.first_line, _$.first_column); }
          | EXPRESION '*' EXPRESION           { $$ = new Arithmetic($1, $3, '*', _$.first_line, _$.first_column); }
          | EXPRESION '/' EXPRESION	    { $$ = new Arithmetic($1, $3, '/', _$.first_line, _$.first_column); }
          | EXPRESION '<' EXPRESION	    { $$ = new Relational($1, $3, '<', _$.first_line, _$.first_column); }
          | EXPRESION '>' EXPRESION           { $$ = new Relational($1, $3, '>', _$.first_line, _$.first_column); }
          | EXPRESION '>=' EXPRESION	    { $$ = new Relational($1, $3, '>=', _$.first_line, _$.first_column); }
          | EXPRESION '<=' EXPRESION	    { $$ = new Relational($1, $3, '<=', _$.first_line, _$.first_column); }
          | EXPRESION '==' EXPRESION	    { $$ = new Relational($1, $3, '==', _$.first_line, _$.first_column); }
          | EXPRESION '!=' EXPRESION	    { $$ = new Relational($1, $3, '!=', _$.first_line, _$.first_column); }
          | EXPRESION '||' EXPRESION	    { $$ = new Logic($1, $3, '&&', _$.first_line, _$.first_column); }
          | EXPRESION '&&' EXPRESION	    { $$ = new Logic($1, $3, '||', _$.first_line, _$.first_column); }
          | 'decimal'		           { $$ = new Primitive(new Type(types.DOUBLE), Number($1), _$.first_line, _$.first_column); }
          | 'true'				    { $$ = new Primitive(new Type(types.BOOLEAN), true, _$.first_line, _$.first_column); }
          | 'false'				    { $$ = new Primitive(new Type(types.BOOLEAN), false, _$.first_line, _$.first_column); }
          | STRING_LITERAL			    { $$ = new Primitive(new Type(types.STRING), $1.replace(/\"/g,""), _$.first_line, _$.first_column); }
          | id EXPRESION_METODO		    { $$ = new Identificador($1, _$.first_line, _$.first_column); }
          | caracter                          { $$ = new Primitive(new Type(types.CHAR), $1.replace(/\'/g,""), _$.first_line, _$.first_column); }
          | entero                            { $$ = new Primitive(new Type(types.INT), Number($1) , _$.first_line, _$.first_column); }
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



OPCION_ID_MAIN: 'main'  {$$ = $1}
              | 'id'    {$$ = $1}
              ;

DECLARACION_AMBITO_CLASE: 'void' OPCION_ID_MAIN '(' OPCION_METODO_FUNCION   { $$ = new Declaracion_ambito_clase($1, $2 , $3 ,  _$.first_line , _$.first_column);}
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

SENTENCIA_CONTINUE: 'continue' ';' {$$ = new Continue( $1, this._$.first_line, this._$.first_column) ;}
                  ;
SENTENCIA_RETURN_METODO: 'return' ';' {$$ = new Return_metodo($1, this._$.first_line , this._$.first_column);}
                        ;
SENTENCIA_RETURN_FUNCION: 'return' EXPRESION ';' {$$ = new Return_metodo($1, $2 , this._$.first_line , this._$.first_column);}
                         ;
SENTENCIA_BREAK_CON_CICLO: 'break' ';' {$$ = new Break(this._$.first_line, this._$.first_column) ;}
                         ; 


