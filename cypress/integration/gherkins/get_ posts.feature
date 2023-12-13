Feature: Busca - Postagens
    Como usuário do sistema
    Quero poder consultar as postagens realizada
    Para as mesmas serem lidas facilmente de forma organizada

    @reg
    @get_posts_todos
    Scenario Outline: Validar o retorno ok da api GET posts e o seu contrato 
        Given quando informar os dados para montar o payload com o get_posts, "<verbo>"
        And validar o retorno da get_posts com o "<statusCode>" e seu contrato

        Examples:
            | statusCode     | verbo |
            | status_code ok | GET   |

    @reg
    @get_posts_id
    Scenario Outline: Validar a busca de um posts por id com sucesso
        Given efetuar a busca de um novo posts por id, "<verbo>"
        And validar a busca de um posts por id com sucesso "<statusCode>"

        Examples:
            | statusCode     | verbo |
            | status_code ok | POST  |

    @reg
    @get_posts_invalido
    Scenario Outline: Validar a busca de um posts por id não existente com sucesso
        Given quando informar os dados para buscar os posts com id invalido "<verbo>"
        And validar a busca de um posts por id não existente com sucesso "<statusCode>"

        Examples:
            | statusCode            | verbo |
            | status_code not_found | GET   |