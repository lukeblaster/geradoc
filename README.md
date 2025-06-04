## GeraDOC 📄
![logo-geradoc](https://github.com/user-attachments/assets/a2e23ec8-db5d-4f32-a2c6-3a5f8b67b043)

O GeraDOC cria arquivos em Excel a partir de modelos previamente cadastrados por nossos desenvolvedores (eu!). Para tal, usamos a biblioteca [`exceljs`](https://www.npmjs.com/package/exceljs) para criação e manipulação dos arquivos `.xlsx`.
Você pode ver os nosso modelos logo abaixo, obrigado! 😊

### Templates (Modelos de Planilha) 🖼️

#### 1. Template de Usuários
![image](https://github.com/user-attachments/assets/52905c3f-5edc-4dd7-a22a-461ea9739bf4)

O Template 1 permite que você gere uma planilha de informações de usuários a serem cadastrados em um sistema externo, afim de agilizar o processo de padronização e geracão de senhas seguras.

- A coluna de usuários é gerada usando um padrão de nome, e sobrenome, caso tenha, com o domínio informado.
- A coluna de senha é gerada automaticamente com a biblioteca [`generate-password`](https://www.npmjs.com/package/generate-password). 
- O template também permite que você adicione uma logo e altere a cor de fundo da primeira célula.
- Informações de nomes de usuário, nome do sistema e domínio são obrigatórias.

### ⚠️ Informações importantes
O GeraDOC apenas gera os arquivos nos navegadores de nossos usuários. De forma alguma, armezenamos as informações enviadas no formulário de nosso sistema. Prezamos pela transparência, honestidade e segurança dos dados de nossos usuários.
