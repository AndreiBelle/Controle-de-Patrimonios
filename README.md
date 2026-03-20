# Site para controle de Patrimônio internos da empresa

Site criado com o objetivo de ter um controle melhor de patrimônios e de manter tudo no mesmo local e organizado, 
seja termos de usos até notas dos equipamentos utilizados.

## Como realizar a implantação do sistema localmente?

Vou passar aqui através do gerenciador de processos PM2, através do CMD (recomendo o PowerShell por achar ele mais "completo")
realize a instalação do PM2 (**npm install pm2 -g**) para o windows é necessario instalar um pacote para ele iniciar o serviço sozinho caso ele o servidor fique fora 
(**npm install pm2-windows-service -g**). 

Após a instalação do PM2 acesse a pasta do projeto através do **cd** ou abra a pasta d seu projeto e no local que mostra o diretório da pasta
clique no diretório, apague e escreva **cmd**, ele vai abrir no diretório do projeto, após isso execute o comando **pm2 start server.js --name "site-patrimonios"** e depois **pm2 save**. 
Para testar se deu certo a instalação execute **pm2 status**, ele vai mostrar o status em verde ou online. 

# IMPORTANTE! Importação das planilhas e PDFs de termos e notas

Foi deixado para salvar no banco apenas o local dos arquivos e os arquivos em pastas localmente no servidor ou local de hospedagem do site, por padrão esta dentro da pasta **Uploads**.

O padrão da planilha e dados para importação sem **termos** ou **notas**são esses:

<img width="1371" height="121" alt="image" src="https://github.com/user-attachments/assets/9716e7b9-1585-4495-b7ab-f6426011212f" />

caso queria adicionar a nota/termo na importação execute a planilha nessa forma:

<img width="1836" height="121" alt="image" src="https://github.com/user-attachments/assets/20d8d0f5-3974-489b-bd77-444a0fe9463f" />
### Sempre iniciando o caminho com a pasta "uploads"
