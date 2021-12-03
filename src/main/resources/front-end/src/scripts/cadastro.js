var res;
function showCursos() {
	$.get("http://localhost:6789/cursos", function (data) {
		console.log(data);
		res = data;
		buildCards();
	});
}

var j = 0;
var last = 4;
function buildCards() {
	data = res;
	if (last - 4 < data.cursos.length) {
		$("#cadastro").html("");
		$("#cadastro").append(`
      <div class="mb-4">
         <h1 class="mb-4 lh-1 font-weight-bold h2">Tabela de Cursos</h1>
      </div>
      `);
		for (let i = 0; i < last; i++) {
			if (i == data.cursos.length) {
				if (j > 0) {
					alertMessage();
				}
				j++;
				break;
			}
			$("#cadastro").append(`
         <div class="card cardMod mb-4" style="z-index: 1">
            <div class="card-body p-6">
               <div class="row">
                  <div class="col-12 card-curso">
                     <div class="col-12 title-card">
                        <p class="font-weight-bold">Título: ${data.cursos[i].titulo}</p>
                        <a onclick="removeCurso(${data.cursos[i].id})" class="button-trash"><i class="fas fa-trash"></i></a>
                     </div>
                     <div class="d-flex">
                        <div class="col-6">
                           <p>ID: ${data.cursos[i].id}</p>
                        </div>
                        <div class="col-6">
                           <p>Autor: ${data.cursos[i].autor}</p>
                        </div>
                     </div>
                     <div class="d-flex">
                        <div class="col-6">
                           <p>Conteúdo: ${data.cursos[i].conteudo}</p>
                        </div>
                        <div class="col-6">
                           <p>Idioma: ${data.cursos[i].idioma}</p>
                        </div>
                     </div>
                     <div class="d-flex">
                        <div class="col-6">
                           <p>Horas: ${data.cursos[i].horas}</p>
                        </div>
                        <div class="col-6">
                           <p>Avaliação: ${data.cursos[i].avaliacao}</p>
                        </div>
                     </div>
                     <div class="d-flex">
                        <div class="col-6">
                           <p class="m-0">Área: ${data.cursos[i].areaid}</p>
                        </div>
                        <div class="col-6">
                           <p class="m-0">URL: ${data.cursos[i].url}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         `);
		}
		$("#cadastro").append(`
      <div class="mb-3 col-12 p-0">
         <input type="button" onclick="buildCards()" value="Carregar mais cursos" id="btnInsert" class="btn btn-primary btn-block mt-4" />
      </div>
      `);
	}
	if (!(last >= data.cursos.length)) {
		last += 4;
	}
}

function alertMessage() {
	alert("Não existem mais cursos a carregar!");
}

function createContent(num) {
	$("#form-add-modulo").addClass(`${num}`);
	$("#modContent").html("");
	$("#modContent").append(`
      <div class="mb-4 mt-5">
         <h1 class="mb-4 lh-1 font-weight-bold h2">Cadastro de ${num == 1 ? "Vídeo" : "Desafio"}</h1>
      </div>
      <div class="form-group">
         <input id="modTitulo" type="text" class="form-control cad" placeholder="Titulo do ${num == 1 ? "Vídeo" : "Desafio"}" />
      </div>
   `);
	$("#submit-button").html("");
	$("#submit-button").append(`
      <div class="form-group d-flex">
         <div class="col-6 pl-0">
            <input id="submit" type="submit" value="Cadastrar" id="btnInsert" class="btn btn-primary btn-block"  />
         </div>
         <div class="col-6 pr-0">
            <input id="voltar" type="button" value="Voltar" id="btnVoltar" class="btn btn-primary btn-block" onclick="resetSubmitButton()"/>
         </div>
      </div>
   `);
	num == 1
		? $("#modContent").append(`
      <div class="form-group">
         <input id="inputHorasMod" type="number" name="horasMod" class="form-control cad" placeholder="Horas" required />
      </div>
      <div class="form-group">
         <input id="modURL" type="text" class="form-control cad" placeholder="URL" />
      </div>
      <div class="form-group">
         <input id="modDescricao" type="text" class="form-control cad" placeholder="Descrição" />
      </div>
   `)
		: $("#modContent").append(`
      <div class="form-group">
         <input id="modQuestao" type="text" class="form-control cad" placeholder="Questão" />
      </div>
   `);
}

function resetSubmitButton() {
	$("#submit-button").html("");
	$("#modContent").html("");
	$("#modContent").append(`
      <div class="form-group d-flex createContent">
         <div class="col-5 p-0">
            <input type="button" class="btn btn-primary btn-block" value="Adicionar Vídeo" onclick="createContent(1)" />
         </div>
         <div class="col-2 p-0 d-flex justify-content-center font-weight-bold" style="font-size: 18px; align-items: center; display: flex">OU</div>
         <div class="col-5 p-0">
            <input type="button" class="btn btn-primary btn-block" value="Adicionar Desafio" onclick="createContent(2)" />
         </div>
      </div>
   `);
}
