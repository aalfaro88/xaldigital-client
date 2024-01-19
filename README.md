<a name="br1"></a> 

**Reto Técnico FullStack MD**

**Instrucciones**

La siguiente prueba técnica constara de una de un pequeño desarrollo integral desde el

backend hasta el frontend, creando la base de datos y generando las consultas

necesarias desde el backend para que por servicios de las API-REST puedan ser

consumidos por el FrontEnd

*Reto*

Usar Lenguaje de programación que se deseable **(python deseado)** para el BackEnd,

realizando una API-REST de preferencia usando un framework Java EE

Usar cualquier lenguaje de programación en el FrontEnd deseable **(Angular4+ ,**

**Rect)**

El desarrollo debe de implementarse en Docker por lo tanto es importante que se

pueda crear la imagen.

Es importante que expliques con claridad el proceso para correr tus

aplicaciones en el readme.md

Implementar pruebas unitarias **(Opcional)**

Implementar Swagger o similar **(Opcional)**

Implementar servidor https sobre docker con certificado auto-firmado **(Opcional)**

Algunas de las cosas que revisaremos del reto:

*Software en funcionamiento*. Revisaremos si la aplicación funciona tal y como se

especifica en el reto

*Limpieza del código*. Esperamos que el código sea limpio, comprensible y mantenible.

**BackEnd**

Se deberá desarrollar el consumo de datos desde el backend utilizando el siguiente

[enlace](https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=perl&site=stackoverflow).

El BackEnd deberá disponibilizar esa información mediante métodos del api, es decir

nuestro servidor backend es el intermediario entre el consumo del enlace y el consumo

del FrontEnd

1\. Obtener el número de respuestas contestadas y no contestadas

2\. Obtener la respuesta con mayor reputación

3\. Obtener la respuesta con menor número de vistas

4\. Obtener la respuesta más vieja y más actual

5\. Imprimir en consola del punto 2 al 5



<a name="br2"></a> 

**Datos de SQL**

Datos para ser consumidos desde el BackEnd, se deberán colocar en una base de datos de

su preferencia.

Se tienen las siguientes tablas que contienen información referente hacia los vuelos

que se realizan en México

*Tabla de aerolíneas*

| id\_aerolinea | nombre\_aerolinea |

\|---|---|

| 1 | Volaris |

| 2 | Aeromar |

| 3 | Interjet |

| 4 | Aeromexico |

*Tabla de aeropuertos*

| id\_aeropuerto | nombre\_aerolinea |

\|---|---|

| 1 | Benito Juarez |

| 2 | Guanajuato |

| 3 | La paz |

| 4 | Oaxaca |

*Tabla de movimientos*

| id\_movimiento | descripcion |

\|---|---|

| 1 | Salida |

| 2 | Llegada |

*Tabla de vuelos*

| id\_aerolinea | id\_aeropuerto | id\_movimiento | dia |

\|---|---|---|---|

| 1 | 1 | 1 | 2021-05-02 |

| 2 | 1 | 1 | 2021-05-02 |

| 3 | 2 | 2 | 2021-05-02 |

| 4 | 3 | 2 | 2021-05-02 |

| 1 | 3 | 2 | 2021-05-02 |

| 2 | 1 | 1 | 2021-05-02 |



<a name="br3"></a> 

| 2 | 3 | 1 | 2021-05-04 |

| 3 | 4 | 1 | 2021-05-04 |

| 3 | 4 | 1 | 2021-05-04 |

*Se requiere saber lo siguiente*

Se deberá desarrollar el consumo de datos desde el backend mediante una conexión a su

base de datos de preferencia.

El BackEnd deberá disponibilizar esa información mediante métodos del api.

1\. ¿Cuál es el nombre aeropuerto que ha tenido mayor movimiento durante el año?

2\. ¿Cuál es el nombre aerolínea que ha realizado mayor número de vuelos durante el

año?

3\. ¿En qué día se han tenido mayor número de vuelos?

4\. ¿Cuáles son las aerolíneas que tienen mas de 2 vuelos por día?

**FrontEnd**

Se deberá desarrollar el consumo de datos desde el backend del total de los 9

servicios del api, deberá de encontrar la manera de mostrar la información de la

manera más amigable posible, es libre de utilizar librerías de gráficas y diseño.

**Flujo**

graph LR

A[SQL] --> B((Backend))

Z[json] --> B

B --> D-[Vista]

**Notas**

Sabemos que 72 horas no es mucho tiempo, pero esperamos que hagas tu mejor esfuerzo, y

recuerda que tu eres el dueño de lo que entregas y puedes decidir qué quieres y qué no

quieres entregar dadas las limitaciones de tiempo.

Ten por seguro que revisaremos cuidadosamente tu reto y nos pondremos en contacto

contigo lo antes posible. Te agradecemos de antemano que te postules en Xaldigital y

esperamos que te diviertas haciendo este reto.

Somos una empresa de mejora continua, y queremos escuchar tus comentarios. Por favor,

comparte con nosotros unas palabras sobre qué te ha parecido el reto, o si hay algo

que podamos mejorar para ofrecer una buena experiencia a nuestros candidatos, ¡y para

ver si podemos hacerlo mejor!

**Por favor, ten en cuenta que sólo revisaremos los proyectos que estén en Github o**

**GitLab.**

Si tienes alguna pregunta sobre el reto, puedes enviarnos un correo electrónico a

<daniel.correa@xaldigital.com>[ ](mailto:daniel.correa@xaldigital.com)o <manuel.vigueras@xaldigital.com>



<a name="br4"></a> 

**¡Buena suerte!**
