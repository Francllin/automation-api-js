Feature: Guardar - Postagens
    Como usuário do sistema
    Quero poder salvar as postagens realizada
    Para as mesmas serem lidas facilmente de forma organizada no futuro

    @reg
    @post_posts_sucesso
    Scenario Outline: Validar o retorno ok da api POST Postagens e o seu contrato 
        Given quando informar os dados para montar o payload com o post_posts, "<verbo>"
        And validar o retorno da post_posts com o "<statusCode>" e seu contrato

        Examples:
            | statusCode          | verbo |
            | status_code created | POST  |

    @reg
    @post_posts_dados_invalidos
    Scenario Outline: Validar o retorno do input no body com dados e tipagem das keys invalidas
        Given quando informar os dados invalidos para montar o payload com o post_posts, "<verbo>"
        And validar o retorno not found quando inserido dados e tipagem invalidas no body

        Examples:
            | verbo |
            | POST  |