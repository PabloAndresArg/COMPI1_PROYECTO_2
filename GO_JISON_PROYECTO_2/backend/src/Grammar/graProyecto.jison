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
  
    const {Importe} = require('../Otros/Importe');
    const {ClaseInstruccion} = require('../Otros/ClaseInstruccion');
    const {Inicio} = require('../Otros/Inicio');
    const {Return_metodo} = require('../Instrucciones/Return_metodo');
    const {Return_funcion} = require('../Instrucciones/Return_funcion');
    const {Sentencia_imprime} = require('../Instrucciones/Sentencia_imprime');
    const {Opcion_metodo_funcion} = require('../Otros/Opcion_metodo_funcion');
    const {Do_while} = require('../Instrucciones/Do_while');
    const {Incre_decre} = require('../Instrucciones/incre_decre');
    const {For} = require('../Instrucciones/For');
    const {Llamada_metodo} = require('../Instrucciones/Llamada_metodo');
    const {Parametro} = require('../Instrucciones/Parametro');
    const {Declaracion_adentro_de_metodos_funciones} = require('../Otros/Declaracion_adentro_de_metodos_funciones');
    const {Sentencia_switch} = require('../Instrucciones/Sentencia_switch');
    const {Ins_case} = require('../Instrucciones/Ins_case');
    const {Ins_Default} = require('../Instrucciones/Ins_Default');
    const {Bloque_cases} = require('../Instrucciones/Bloque_cases');
    const {DeclaracionMetodo} = require('../Instrucciones/DeclaracionMetodo');
    const {DeclaracionFuncion} = require('../Instrucciones/DeclaracionFuncion');
    const {DeclaracionGlobales} = require('../Instrucciones/DeclaracionGlobales');
    var esta_en_un_ciclo = false;
    var esta_en_un_metodo = false ; 
    var esta_en_una_funcion = false; 
    var isMain = false; 
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
"--"                  return 'decremento'
"-"                   return '-'
"++"                  return 'incremento'
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



IMPORTE: 'import' 'id' ';'   {$$ = new Importe($2, $2 ,  this._$.first_line, this._$.first_column);}
       ;
       
                       
SENTENCIA_CLASE:'class' 'id' BLOQUE_DECLARACIONES_METFUNVAR {$$ = new ClaseInstruccion($2, $3 ,  this._$.first_line, this._$.first_column);}
              | error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }  
               ;
               


BLOQUE_DECLARACIONES_METFUNVAR : '{' LISTA_DECLARACIONES_METFUNVAR_P '}' {$$ = $2;}              /* este es para que acepte vacios*/
                               | '{' '}' {$$ = [];}
                               | error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }   
                               ;


LISTA_DECLARACIONES_METFUNVAR_P: LISTA_DECLARACIONES_METFUNVAR_P DECLARACION_AMBITO_CLASE { $1.push($2); $$ = $1; }
                               | DECLARACION_AMBITO_CLASE      { $$ = [$1]; }
                               ;


OPCION_ID_MAIN: 'main'  {$$ = $1}
              | id    {$$ = $1}
              ;

DECLARACION_AMBITO_CLASE: 'void' OPCION_ID_MAIN '(' OPCION_METODO_FUNCION   { $$ = new DeclaracionMetodo($1, $2 , $4 ,  this._$.first_line , this._$.first_column);console.log("METODO");}
                        | TIPO id '(' OPCION_METODO_FUNCION { $$ = new DeclaracionFuncion($1, $2 , $4 ,  this._$.first_line , this._$.first_column); console.log("FUNCION"); }
                        | TIPO LISTA_IDS ASIGNACION {$$ = new DeclaracionGlobales($1,$2,$3,this._$.first_line , this._$.first_column ); console.log(" LISTA ids solo globales ");}
                        ; 



 OPCION_METODO_FUNCION: LISTA_PARAMETROS_CON_TIPO ')' BLOQUE_INSTRUCCIONES  {$$ = new Opcion_metodo_funcion($1 , $3 , this._$.first_line); console.log("CON PARAMETROS");}                                 
                     |')' BLOQUE_INSTRUCCIONES    {$$ = new Opcion_metodo_funcion( [], $2  , this._$.first_line); console.log("SIN PARAMETROS ");}
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
            | SENTENCIA_BREAK {$$ = $1;}
            ;
TIPO : 'int' {$$ = new Type(types.INT);}
     | 'String' {$$ = new Type(types.STRING);}
     | 'boolean' {$$ = new Type(types.BOOLEAN);}
     | 'double' {$$ = new Type(types.DOUBLE);}
     | 'char'{$$ = new Type(types.CHAR);}
     ;


SENTENCIA_FOR:'for' '(' DEC_for ';' EXPRESION ';' INCRE_DECRE ')' BLOQUE_INSTRUCCIONES {$$ = new For($3, $5,$7 , $9 , this._$.first_line , this._$.first_column); }
             ;

DEC_for: TIPO 'id' '=' EXPRESION {$$ = new Declaracion($1 , $2 ,$4 , this._$.first_line , this._$.first_column );}
       | 'id' '=' EXPRESION {$$ = new  Asignacion($1 , $3 , this._$.first_line , this._$.first_column ) ; }
       ;
INCRE_DECRE: 'id' 'incremento'  {$$ = new Incre_decre($1, "++", this._$.first_line , this._$.first_column ) ; console.log("incremento");}
           | 'id' 'decremento' {$$ = new Incre_decre($1, "--", this._$.first_line , this._$.first_column ) ;  console.log("decremento");}
           ;


DOWHILE: 'do' BLOQUE_INSTRUCCIONES 'while' CONDICION ';' {$$ = new Do_while($4 ,$2 , this._$.first_line , this._$.first_column );}
       ;

SENTENCIAIMPRIME: 'System' '.' 'out' '.'  OPCIONIMPRIME '(' EXPRESION ')' ';' { $$ = new Sentencia_imprime($5,$7, this._$.first_line, this._$.first_column);}
                ;


OPCIONIMPRIME : 'println' {$$ = $1 ; }
	       | 'print' {$$ = $1;}
              ; 



WHILE : 'while' CONDICION BLOQUE_INSTRUCCIONES {$$ = new While($2, $3, this._$.first_line, this._$.first_column);}
      ;

IF : 'if' CONDICION BLOQUE_INSTRUCCIONES {$$ = new If($2, $3, [], this._$.first_line, this._$.first_column);}
   | 'if' CONDICION BLOQUE_INSTRUCCIONES 'else' BLOQUE_INSTRUCCIONES {$$ = new If($2, $3, $5, this._$.first_line, this._$.first_column);}
   | 'if' CONDICION BLOQUE_INSTRUCCIONES 'else' IF {$$ = new If($2, $3, [$5], this._$.first_line, this._$.first_column);}
   ;



CONDICION : '(' EXPRESION ')' {$$ = $2;}
          ;




BLOQUE_INSTRUCCIONES : '{' INSTRUCCIONES '}' {$$ = $2;}              /* este es para que acepte vacios*/
                     | '{' '}'    {$$ = [];}
                     ;
      
EXPRESION : '-' EXPRESION %prec UMENOS	    { $$ = new Arithmetic($1, null, '-', this._$.first_line, this._$.first_column); }
          | '!' EXPRESION	                  { $$ = new Arithmetic($1, null, '!', this._$.first_line, this._$.first_column); }
          | EXPRESION '+' EXPRESION           { $$ = new Arithmetic($1, $3, '+', this._$.first_line, this._$.first_column); }
          | EXPRESION '-' EXPRESION           { $$ = new Arithmetic($1, $3, '-', this._$.first_line, this._$.first_column); }
          | EXPRESION '*' EXPRESION           { $$ = new Arithmetic($1, $3, '*', this._$.first_line, this._$.first_column); }
          | EXPRESION '/' EXPRESION	    { $$ = new Arithmetic($1, $3, '/', this._$.first_line, this._$.first_column); }
          | EXPRESION '<' EXPRESION	    { $$ = new Relational($1, $3, '<', this._$.first_line, this._$.first_column); }
          | EXPRESION '>' EXPRESION           { $$ = new Relational($1, $3, '>', this._$.first_line, this._$.first_column); }
          | EXPRESION '>=' EXPRESION	    { $$ = new Relational($1, $3, '>=', this._$.first_line, this._$.first_column); }
          | EXPRESION '<=' EXPRESION	    { $$ = new Relational($1, $3, '<=', this._$.first_line, this._$.first_column); }
          | EXPRESION '==' EXPRESION	    { $$ = new Relational($1, $3, '==', this._$.first_line, this._$.first_column); }
          | EXPRESION '!=' EXPRESION	    { $$ = new Relational($1, $3, '!=', this._$.first_line, this._$.first_column); }
          | EXPRESION '||' EXPRESION	    { $$ = new Logic($1, $3, '&&', this._$.first_line, this._$.first_column); }
          | EXPRESION '&&' EXPRESION	    { $$ = new Logic($1, $3, '||', this._$.first_line, this._$.first_column); }
          | 'decimal'		           { $$ = new Primitive(new Type(types.DOUBLE), Number($1), this._$.first_line, this._$.first_column); }
          | 'true'				    { $$ = new Primitive(new Type(types.BOOLEAN), true, this._$.first_line, this._$.first_column); }
          | 'false'				    { $$ = new Primitive(new Type(types.BOOLEAN), false, this._$.first_line, this._$.first_column); }
          | STRING_LITERAL			    { $$ = new Primitive(new Type(types.STRING), $1.replace(/\"/g,""), this._$.first_line, this._$.first_column); }
          | EXPRESION_METODO		    { $$ = $1}
          | caracter                          { $$ = new Primitive(new Type(types.CHAR), $1.replace(/\'/g,""), this._$.first_line, this._$.first_column); }
          | entero                            { $$ = new Primitive(new Type(types.INT), Number($1) , this._$.first_line, this._$.first_column); }
          | '(' EXPRESION ')'		    { $$ = $2; }
          ;


SENTENCIA_SWITCH: 'switch' '(' EXPRESION ')' BLOQUE_CASES {$$ = new Sentencia_switch($3,$5,this._$.first_line, this._$.first_column)}
                ;
              
BLOQUE_CASES:  '{' LISTACASES OPCIONDEFAULT '}' {$$ = new Bloque_cases($2 ,$3);}    
            | '{' '}'    {$$ = [];}
            ;
        
OPCIONDEFAULT:'default' ':' BLOQUEINST_CON_OPCION_VACIA  SENTENCIA_BREAK { $$ = new Ins_Default($3,$4,this._$.first_line, this._$.first_column);}
             | {$$ = [];} 
             ;



LISTACASES: LISTACASES CASES_P  { $1.push($2); $$ = $1; }
          | CASES_P  { $$ = [$1]; }
          ;
CASES_P :'case' EXPRESION ':' BLOQUEINST_CON_OPCION_VACIA SENTENCIA_BREAK { $$ = new Ins_case($2,$4,$5,this._$.first_line, this._$.first_column);}
        ;

SENTENCIA_BREAK: 'break' ';'  {$$ = new Break(this._$.first_line, this._$.first_column) ;}
               ;

BLOQUEINST_CON_OPCION_VACIA:  INSTRUCCIONESWITCH {$$=$1;}
                            | {$$=[];}
                            ;


INSTRUCCIONESWITCH : INSTRUCCIONESWITCH INSTRUCCIONSWITCH { $1.push($2); $$ = $1; }
              | INSTRUCCIONSWITCH               { $$ = [$1]; }
              |  error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
              ;
// LO MISMO PERO NO TIENE EL BREAK para que no se encicle 
INSTRUCCIONSWITCH : SENTENCIAIMPRIME     {$$ = $1;}
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

















/* PUEDE SER UNA ASIGNACION O PUEDE SER UNA LLAMADA DE METODO */
ASIGNACION_SIMPLE: id '=' EXPRESION ';'  {$$ = new Asignacion($1, $3,this._$.first_line, this._$.first_column); ;console.log("jeje simple asignacion")}
                  |id '(' LISTA_EXPRESIONES_LLAMADA_METODO ')' ';'  {$$ = new Llamada_metodo($1 ,$3, this._$.first_line, this._$.first_column);console.log("call metodo")}
                  |id '(' ')' ';'     {$$ = new Llamada_metodo($1 ,[], this._$.first_line, this._$.first_column); console.log("NO LLEVA PARAMAETTROS");}
                 ;

/*
OPCION_ASIGNACION: '=' EXPRESION ';'
                 | '(' LISTA_EXPRESIONES_LLAMADA_METODO ')' ';'   {console.log("lleva_parametros")}
                 | ')' ';'                                   {console.log("NO LLEVA PARAMAETTROS")}
                 ;*/
// LISTA_EXPRESIONES A VECES DICE ARRAY ENTRE ARRAY :v 
EXPRESION_METODO: id '(' LISTA_EXPRESIONES_LLAMADA_METODO ')'  {$$ = new Llamada_metodo($1 ,$3, this._$.first_line, this._$.first_column);console.log("SI lleva parametros")}
                | id '(' ')'     {$$ = new Llamada_metodo($1 ,[], this._$.first_line, this._$.first_column); console.log("NO LLEVA PARAMAETTROS");}
                | id  { $$ = new Identificador($1, this._$.first_line, this._$.first_column); ;console.log("ID SIMPLE ")}
                ;

/*
SENTENCIA_LLAMA_METODO : LISTA_EXPRESIONES_LLAMADA_METODO ')'   {console.log("lleva_parametros")}
		          | ')'                                   {console.log("NO LLEVA PARAMAETTROS")}
                        ;*/
/*
LISTA_IDS: LISTA_IDS ',' id  { $1.push($3); $$ = $1; }
         | id  { $$ = [$1]; }
         ; 
*/
LISTA_EXPRESIONES_LLAMADA_METODO: LISTA_EXPRESIONES_LLAMADA_METODO ',' EXPRESION  { $1.push($3); $$ = $1; }
                                | EXPRESION { $$ = [$1]; }
                                ;

                                /*
LISTA_EXPRESIONES_LLAMADA_METODO :EXPRESION  LISTA_EXPRESIONES_LLAMADA_METODOP 
                                 ;
LISTA_EXPRESIONES_LLAMADA_METODOP: LISTA_EXPRESIONES_LLAMADA_METODOP ',' EXPRESION   { $1.push($3); $$ = $1; }
                                 | ',' EXPRESION { $$ = [$1]; }
                                 | error { console.error('Este es un error sintáctico: [ ' + yytext + ' ] en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
                                 ;*/


DECLARACION_ADENTRO_DE_METODOS_FUNCIONES: TIPO LISTA_IDS ASIGNACION { $$ = new Declaracion_adentro_de_metodos_funciones($1,$2,$3 ,this._$.first_line , this._$.first_column ); console.log("dec adentro de metodos");}
                                        ;

/*
DECLARACION_ADENTRO_DE_METODOS_FUNCIONESP: LISTA_IDS ASIGNACION {$$ = new Declaracion_adentro_de_metodos_funcionesP($1,$2);}
                                         ;     
*/   

LISTA_IDS: LISTA_IDS ',' id  { $1.push($3); $$ = $1; }
         | id  { $$ = [$1]; }
         ; 




ASIGNACION: '=' EXPRESION ';' {$$ = $2}
          | ';' {$$ = [];}
          ;





                                                                      
LISTA_PARAMETROS_CON_TIPO :LISTA_PARAMETROS_CON_TIPO  ','  TIPO 'id'     { $1.push(new Parametro($3 , $4 ,this._$.first_line , this._$.first_column)); $$ = $1; }
			   | TIPO 'id'{ $$ = [new Parametro($1 , $2 ,this._$.first_line , this._$.first_column)]; }
                        ;






/* SENTENCIA BREAK */

SENTENCIA_CONTINUE: 'continue' ';' {$$ = new Continue( $1, this._$.first_line, this._$.first_column) ;}
                  ;
SENTENCIA_RETURN_METODO: 'return' ';' {$$ = new Return_metodo($1, this._$.first_line , this._$.first_column);}
                        ;
SENTENCIA_RETURN_FUNCION: 'return' EXPRESION ';' {$$ = new Return_funcion($1, $2 , this._$.first_line , this._$.first_column);}
                         ;
SENTENCIA_BREAK_CON_CICLO: 'break' ';' {$$ = new Break(this._$.first_line, this._$.first_column) ;}
                         ; 


