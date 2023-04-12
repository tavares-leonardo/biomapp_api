
var need_destroy = 0
var analisaDados = document.getElementById("analisaDados");
var fileDados = document.getElementById("fileDados");
var fileModelo = document.getElementById("fileModelo");
var tableModelo = document.getElementById("tableModelo");


analisaDados.addEventListener("click", async function (e) 
{

	console.log(fileDados.files[0]);
	console.log(fileModelo.files[0]);

	model = []
	up_model = []
	ll_model = []

	var parametro = '';

	const csvFileModelo = fileModelo.files[0]
	dfd.readCSV(csvFileModelo).then((df) => {

		const jsonObj = dfd.toJSON(df);
		console.log(jsonObj);

		parametro = jsonObj[0]['Modelo']
		console.log(parametro)

		model.push(jsonObj[0]['A0']);
		model.push(jsonObj[0]['A1']);
		model.push(jsonObj[0]['F1']);
		model.push(jsonObj[0]['A2']);
		model.push(jsonObj[0]['F2']);

		up_model.push(jsonObj[1]['A0']);
		up_model.push(jsonObj[1]['A1']);
		up_model.push(jsonObj[1]['F1']);
		up_model.push(jsonObj[1]['A2']);
		up_model.push(jsonObj[1]['F2']);

		ll_model.push(jsonObj[2]['A0']);
		ll_model.push(jsonObj[2]['A1']);
		ll_model.push(jsonObj[2]['F1']);
		ll_model.push(jsonObj[2]['A2']);
		ll_model.push(jsonObj[2]['F2']);

		console.log(model);
		console.log(up_model);
		console.log(ll_model);

	});

	const csvFileDados = fileDados.files[0]
	dfd.readCSV(csvFileDados).then((df) => {

		const jsonObj = dfd.toJSON(df);
		console.log(jsonObj);

		console.log(jsonObj.length);


		const time = [];
		const value = [];
		const uvalue = [];
		const lvalue = [];
		const rvalue = [];

		// preenche a table com as estatisticas retornadas pela API - tableEstatisticas
		let theadE = tableModelo.createTHead();

		theadE.innerHTML = "<thead>\
		<tr>\
		<th style=\"width: 12%\">Data</th>\
		<th style=\"width: 12%\">Hora</th>\
		<th>Ocorrência</th>\
		</tr>\
		</thead>";


		i = jsonObj[0]['Hora']

		for (let j = 0; j < jsonObj.length; j+=1) {

			time.push(i.toString());

			value.push((model[0]+model[1]*Math.cos((2*3.14159*i/24.0)+model[2])+model[3]*Math.cos((4*3.14159*i/24.0)+model[4])).toString());
			uvalue.push(utmp = (up_model[0]+up_model[1]*Math.cos((2*3.14159*i/24.0)+up_model[2])+up_model[3]*Math.cos((4*3.14159*i/24.0)+up_model[4])).toString());
			lvalue.push((ll_model[0]+ll_model[1]*Math.cos((2*3.14159*i/24.0)+ll_model[2])+ll_model[3]*Math.cos((4*3.14159*i/24.0)+ll_model[4])).toString());
			rvalue.push(jsonObj[j][parametro]);


			if(jsonObj[j][parametro] > utmp) {
				console.log(jsonObj[j][parametro]);

				let rowE = theadE.insertRow();
				rowE.insertCell(0).innerHTML = jsonObj[j]['Data'];
				rowE.insertCell(1).innerHTML = jsonObj[j]['Hora'] + 'h';
				let num = parseFloat(utmp);
				rowE.insertCell(2).innerHTML = parametro + ' acima do esperado: valor máximo: ' + num.toFixed(1) + ' / valor medido: ' + parseFloat(jsonObj[j]['Vazao do Esgoto']).toFixed(1);

			}

			i=i+1;
		}

		if(need_destroy) {
			myChart2.destroy();
		}

		need_destroy = 1

		myChart2 = new Chart(document.getElementById("analise-chart"), {
			type: "line",
			data: {
				labels: time,
				datasets: [{
					type: 'scatter',
					radius: 4,
					label: "Mediana",
					backgroundColor: 'rgb(0, 0, 0)',
					borderColor: 'rgb(0, 0, 0)',
					fill: false,
					data: rvalue,
				}, { 
					data: value,
					radius: 1,
					label: "Predição",
					borderColor: "#3e95cd",
					fill: false
				}, { 
					data: uvalue,
					radius: 1,
					label: "Limite Superior",
					borderColor: "#c45850",
					fill: false,
					borderDash: [10,5]
				}, { 
					data: lvalue,
					radius: 1,
					label: "Limite Inferior",
					borderColor: "#3cba9f",
					fill: false,
					borderDash: [10,5]
				}]
			},
			options:   
			{
				title: {
					display: true,
					text: 'parametro.value'
				}
			}
		});

	})

});
