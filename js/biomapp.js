
var need_destroy = 0

var geraModelo = document.getElementById("geraModelo");
var inputFile = document.getElementById("file");
var tableModelo = document.getElementById("tableModelo");
var tableModeloEq = document.getElementById("tableModeloEq");
var tableEstatisticas = document.getElementById("tableEstatisticas");
var tableEstatisticas2 = document.getElementById("tableEstatisticas2");
var downloadModelo = document.getElementById("downloadModelo");
var coefDeterminacao = document.getElementById("coefDeterminacao");

function download(filename, textInput) {

	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textInput));
	element.setAttribute('download', filename);
	document.body.appendChild(element);
	element.click();
}

downloadModelo.addEventListener("click", () => {

	var text = '';

	var strParametro = parametro.value
	strParametro = strParametro.replace(/\s/g, '_');

	var filename = 'Modelo_' + strParametro + '.csv';

	for(var i=0;i<4;i++) {

		var oCells = tableModelo.rows.item(i).cells;

		for(var j=0;j<6;j++) {
			var cellVal = oCells.item(j).innerHTML;
			text += cellVal;
			text += ',';
		}

		text += '\r\n';
	}

	download(filename, text);
})


function trubisquinho(body) 
{
	console.log(body)

	coefDeterminacao.innerHTML = 'R<sup>2</sup> : ' + parseFloat(body[32]['R2']).toFixed(5);

	// preenche a table com os parametros dos modelos retornados pela API

	let theadEq = tableModeloEq.createTHead();

	theadEq.innerHTML = "<thead>\
							<tr>\
								<th>Modelo</th>\
								<th style=\"width: 80%\">Equação</th>\
							</tr>\
						</thead>";

	let rowEq = theadEq.insertRow();
	rowEq.insertCell(0).innerHTML = parametro.value;
	strEq1 = 'y(t) = ' + parseFloat(body[0]['model'][0]).toFixed(2) + ' + ' + parseFloat(body[0]['model'][1]).toFixed(2) + '\\cdot cos \\left( \\frac{2 \\pi}{24} t + ' + parseFloat(body[0]['model'][2]).toFixed(2) + '\\right)' + ' + ' + parseFloat(body[0]['model'][3]).toFixed(3) + '\\cdot cos \\left( \\frac{4 \\pi}{24} t + ' + parseFloat(body[0]['model'][4]).toFixed(3) + '\\right)';
	rowEq.insertCell(1).innerHTML = katex.renderToString(strEq1);

	let rowEq1 = theadEq.insertRow();
	rowEq1.insertCell(0).innerHTML = 'Limite Superior';
	strEq1 = 'y(t) = ' + parseFloat(body[1]['ul_model'][0]).toFixed(2) + ' + ' + parseFloat(body[1]['ul_model'][1]).toFixed(2) + '\\cdot cos \\left( \\frac{2 \\pi}{24} t + ' + parseFloat(body[1]['ul_model'][2]).toFixed(2) + '\\right)' + ' + ' + parseFloat(body[1]['ul_model'][3]).toFixed(3) + '\\cdot cos \\left( \\frac{4 \\pi}{24} t + ' + parseFloat(body[1]['ul_model'][4]).toFixed(3) + '\\right)';
	rowEq1.insertCell(1).innerHTML = katex.renderToString(strEq1);

	let rowEq2 = theadEq.insertRow();
	rowEq2.insertCell(0).innerHTML = 'Limite Inferior';
	strEq1 = 'y(t) = ' + parseFloat(body[2]['ll_model'][0]).toFixed(2) + ' + ' + parseFloat(body[2]['ll_model'][1]).toFixed(2) + '\\cdot cos \\left( \\frac{2 \\pi}{24} t + ' + parseFloat(body[2]['ll_model'][2]).toFixed(2) + '\\right)' + ' + ' + parseFloat(body[2]['ll_model'][3]).toFixed(3) + '\\cdot cos \\left( \\frac{4 \\pi}{24} t + ' + parseFloat(body[2]['ll_model'][4]).toFixed(3) + '\\right)';
	rowEq2.insertCell(1).innerHTML = katex.renderToString(strEq1);

	let thead = tableModelo.createTHead();

	thead.innerHTML = "<thead>\
	<tr>\
	<th>Modelo</th>\
	<th style=\"width: 15%\">A0</th>\
	<th style=\"width: 15%\">A1</th>\
	<th style=\"width: 15%\">F1</th>\
	<th style=\"width: 15%\">A2</th>\
	<th style=\"width: 15%\">F2</th>\
	</tr>\
	</thead>";

	let row = thead.insertRow();
	row.insertCell(0).innerHTML = parametro.value;
	for (let i = 0; i < 5; i++) {
		row.insertCell(i + 1).innerHTML = parseFloat(body[0]['model'][i]).toFixed(5);
	}

	let row1 = thead.insertRow();
	row1.insertCell(0).innerHTML = 'Limite Superior';
	for (let i = 0; i < 5; i++) {
		row1.insertCell(i + 1).innerHTML = parseFloat(body[1]['ul_model'][i]).toFixed(5);
	}

	let row2 = thead.insertRow();
	row2.insertCell(0).innerHTML = 'Limite Inferior';
	for (let i = 0; i < 5; i++) {
		row2.insertCell(i + 1).innerHTML = parseFloat(body[2]['ll_model'][i]).toFixed(5);
	}

  // preenche a table com as estatisticas retornadas pela API - tableEstatisticas
	let theadE = tableEstatisticas.createTHead();

	theadE.innerHTML = "<thead>\
	<tr>\
	<th>Estatistica</th>\
	<th style=\"width: 7.5%\">00h</th>\
	<th style=\"width: 7.5%\">01h</th>\
	<th style=\"width: 7.5%\">02h</th>\
	<th style=\"width: 7.5%\">03h</th>\
	<th style=\"width: 7.5%\">04h</th>\
	<th style=\"width: 7.5%\">05h</th>\
	<th style=\"width: 7.5%\">06h</th>\
	<th style=\"width: 7.5%\">07h</th>\
	<th style=\"width: 7.5%\">08h</th>\
	<th style=\"width: 7.5%\">09h</th>\
	<th style=\"width: 7.5%\">10h</th>\
	<th style=\"width: 7.5%\">11h</th>\
	</tr>\
	</thead>\
	<tbody id=\"testBodyE\"></tbody>";

	let rowE = theadE.insertRow();
	rowE.insertCell(0).innerHTML = 'Media';
	for (let i = 0; i < 12; i++) {
		rowE.insertCell(i + 1).innerHTML = parseFloat(body[3]['media'][i]).toFixed(2);
	}

	let rowE1 = theadE.insertRow();
	rowE1.insertCell(0).innerHTML = 'Desvio Padrao';
	for (let i = 0; i < 12; i++) {
		rowE1.insertCell(i + 1).innerHTML = parseFloat(body[5]['desvio_padrao'][i]).toFixed(2);
	}

	let rowE2 = theadE.insertRow();
	rowE2.insertCell(0).innerHTML = 'Mediana';
	for (let i = 0; i < 12; i++) {
		rowE2.insertCell(i + 1).innerHTML = parseFloat(body[4]['mediana'][i]).toFixed(2);
	}

	let rowE3 = theadE.insertRow();
	rowE3.insertCell(0).innerHTML = 'Q1';
	for (let i = 0; i < 12; i++) {
		rowE3.insertCell(i + 1).innerHTML = parseFloat(body[6]['quartil1'][i]).toFixed(2);
	}

	let rowE4 = theadE.insertRow();
	rowE4.insertCell(0).innerHTML = 'Q3';
	for (let i = 0; i < 12; i++) {
		rowE4.insertCell(i + 1).innerHTML = parseFloat(body[7]['quartil3'][i]).toFixed(2);
	}

	let theadE2 = tableEstatisticas2.createTHead();

	theadE2.innerHTML = "<thead>\
	<tr>\
	<th>Estatistica</th>\
	<th style=\"width: 7.5%\">12h</th>\
	<th style=\"width: 7.5%\">13h</th>\
	<th style=\"width: 7.5%\">14h</th>\
	<th style=\"width: 7.5%\">15h</th>\
	<th style=\"width: 7.5%\">16h</th>\
	<th style=\"width: 7.5%\">17h</th>\
	<th style=\"width: 7.5%\">18h</th>\
	<th style=\"width: 7.5%\">19h</th>\
	<th style=\"width: 7.5%\">20h</th>\
	<th style=\"width: 7.5%\">21h</th>\
	<th style=\"width: 7.5%\">22h</th>\
	<th style=\"width: 7.5%\">23h</th>\
	</tr>\
	</thead>\
	<tbody id=\"testBodyE2\"></tbody>";

	let rowE20 = theadE2.insertRow();
	rowE20.insertCell(0).innerHTML = 'Media';
	for (let i = 0; i < 12; i++) {
		rowE20.insertCell(i + 1).innerHTML = parseFloat(body[3]['media'][i+12]).toFixed(2);
	}

	let rowE21 = theadE2.insertRow();
	rowE21.insertCell(0).innerHTML = 'Desvio Padrao';
	for (let i = 0; i < 12; i++) {
		rowE21.insertCell(i + 1).innerHTML = parseFloat(body[5]['desvio_padrao'][i+12]).toFixed(2);
	}

	let rowE22 = theadE2.insertRow();
	rowE22.insertCell(0).innerHTML = 'Mediana';
	for (let i = 0; i < 12; i++) {
		rowE22.insertCell(i + 1).innerHTML = parseFloat(body[4]['mediana'][i+12]).toFixed(2);
	}

	let rowE23 = theadE2.insertRow();
	rowE23.insertCell(0).innerHTML = 'Q1';
	for (let i = 0; i < 12; i++) {
		rowE23.insertCell(i + 1).innerHTML = parseFloat(body[6]['quartil1'][i+12]).toFixed(2);
	}

	let rowE24 = theadE2.insertRow();
	rowE24.insertCell(0).innerHTML = 'Q3';
	for (let i = 0; i < 12; i++) {
		rowE24.insertCell(i + 1).innerHTML = parseFloat(body[7]['quartil3'][i+12]).toFixed(2);
	}



	const time = [];
	const value = [];
	const uvalue = [];
	const lvalue = [];
	const mediane = [];
	const media = [];
	for (let i = 0; i < 24; i+=1) {
		time.push(i.toString());
		value.push((body[0]['model'][0]+body[0]['model'][1]*Math.cos((2*3.14159*i/24.0)+body[0]['model'][2])+body[0]['model'][3]*Math.cos((4*3.14159*i/24.0)+body[0]['model'][4])).toString());
		uvalue.push((body[1]['ul_model'][0]+body[1]['ul_model'][1]*Math.cos((2*3.14159*i/24.0)+body[1]['ul_model'][2])+body[1]['ul_model'][3]*Math.cos((4*3.14159*i/24.0)+body[1]['ul_model'][4])).toString());
		lvalue.push((body[2]['ll_model'][0]+body[2]['ll_model'][1]*Math.cos((2*3.14159*i/24.0)+body[2]['ll_model'][2])+body[2]['ll_model'][3]*Math.cos((4*3.14159*i/24.0)+body[2]['ll_model'][4])).toString());
		media.push(body[3]['media'][i]);
		mediane.push(body[4]['mediana'][i]);
	}


	const h00 = [];
	for (let j=0;j<body[8]['h00'].length;j+=1) {
		h00.push(body[8]['h00'][j]);
	}
	const h01 = [];
	for (let j=0;j<body[9]['h01'].length;j+=1) {
		h01.push(body[9]['h01'][j]);
	}
	const h02 = [];
	for (let j=0;j<body[10]['h02'].length;j+=1) {
		h02.push(body[10]['h02'][j]);
	}
	const h03 = [];
	for (let j=0;j<body[11]['h03'].length;j+=1) {
		h03.push(body[11]['h03'][j]);
	}
	const h04 = [];
	for (let j=0;j<body[12]['h04'].length;j+=1) {
		h04.push(body[12]['h04'][j]);
	}
	const h05 = [];
	for (let j=0;j<body[13]['h05'].length;j+=1) {
		h05.push(body[13]['h05'][j]);
	}
	const h06 = [];
	for (let j=0;j<body[14]['h06'].length;j+=1) {
		h06.push(body[14]['h06'][j]);
	}
	const h07 = [];
	for (let j=0;j<body[15]['h07'].length;j+=1) {
		h07.push(body[15]['h07'][j]);
	}
	const h08 = [];
	for (let j=0;j<body[16]['h08'].length;j+=1) {
		h08.push(body[16]['h08'][j]);
	}
	const h09 = [];
	for (let j=0;j<body[17]['h09'].length;j+=1) {
		h09.push(body[17]['h09'][j]);
	}
	const h10 = [];
	for (let j=0;j<body[18]['h10'].length;j+=1) {
		h10.push(body[18]['h10'][j]);
	}
	const h11 = [];
	for (let j=0;j<body[19]['h11'].length;j+=1) {
		h11.push(body[19]['h11'][j]);
	}

	const h12 = [];
	for (let j=0;j<body[20]['h12'].length;j+=1) {
		h12.push(body[20]['h12'][j]);
	}
	const h13 = [];
	for (let j=0;j<body[21]['h13'].length;j+=1) {
		h13.push(body[21]['h13'][j]);
	}
	const h14 = [];
	for (let j=0;j<body[22]['h14'].length;j+=1) {
		h14.push(body[22]['h14'][j]);
	}
	const h15 = [];
	for (let j=0;j<body[23]['h15'].length;j+=1) {
		h15.push(body[23]['h15'][j]);
	}
	const h16 = [];
	for (let j=0;j<body[24]['h16'].length;j+=1) {
		h16.push(body[24]['h16'][j]);
	}
	const h17 = [];
	for (let j=0;j<body[25]['h17'].length;j+=1) {
		h17.push(body[25]['h17'][j]);
	}
	const h18 = [];
	for (let j=0;j<body[26]['h18'].length;j+=1) {
		h18.push(body[26]['h18'][j]);
	}
	const h19 = [];
	for (let j=0;j<body[27]['h19'].length;j+=1) {
		h19.push(body[27]['h19'][j]);
	}
	const h20 = [];
	for (let j=0;j<body[28]['h20'].length;j+=1) {
		h20.push(body[28]['h20'][j]);
	}
	const h21 = [];
	for (let j=0;j<body[29]['h21'].length;j+=1) {
		h21.push(body[29]['h21'][j]);
	}
	const h22 = [];
	for (let j=0;j<body[30]['h22'].length;j+=1) {
		h22.push(body[30]['h22'][j]);
	}
	const h23 = [];
	for (let j=0;j<body[31]['h23'].length;j+=1) {
		h23.push(body[31]['h23'][j]);
	}

	const data = {
		labels: ['0h','1h','2h','3h','4h','5h','6h','7h','8h','9h','10h','11h','12h','13h','14h','15h','16h','17h','18h','19h','20h','21h','22h','23h'],
		datasets: [{
			label: parametro.value,
			outlierColor: '#000000',
			padding: 0,
			itemRadius: 0,
			data: [ 
				h00, 
				h01, 
				h02, 
				h03, 
				h04, 
				h05, 
				h06, 
				h07, 
				h08, 
				h09, 
				h10, 
				h11, 
				h12, 
				h13, 
				h14, 
				h15, 
				h16, 
				h17, 
				h18, 
				h19, 
				h20, 
				h21, 
				h22, 
				h23
				],
			//backgroundColor: 'rgba(255, 26, 104, 0.2)',
			backgroundColor: 'rgba(70, 70, 70, 0.2)',
			//borderColor: 'rgba(255, 26, 104, 1)',
			borderColor: 'rgba(20, 20, 20, 1)',
			borderWidth: 1
		}]
	};

    // config 
	const config = {
		type: 'boxplot',
		data,
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	};


	if(need_destroy) {
		myChart.destroy();
		myChart2.destroy();
	}

	myChart = new Chart(
		document.getElementById('myChart'),
		config
		);
	need_destroy = 1

	if(metrica.value == 'Mediana') {
		labelMetrica = 'Mediana';
		dataGrafico = mediane;
	}
	else {
		labelMetrica = 'Média';
		dataGrafico = media;
	}


	myChart2 = new Chart(document.getElementById("line-chart"), {
		type: "line",
		data: {
    labels: time, //[1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
    datasets: [{
    	type: 'scatter',
    	radius: 4,
    	label: labelMetrica,
    	backgroundColor: 'rgb(0, 0, 0)',
    	borderColor: 'rgb(0, 0, 0)',
    	fill: false,
      //borderDash: [0,0],
    	data: dataGrafico
    }, { 
        data: value, //[86,114,106,106,107,111,133,221,783,2478],
        radius: 1,
        label: "Predição",
        borderColor: "#3e95cd",
        fill: false
      }, { 
        data: uvalue, //[86,114,106,106,107,111,133,221,783,2478],
        radius: 1,
        label: "Limite Superior",
        borderColor: "#c45850",
        fill: false,
        borderDash: [10,5]
      }, { 
        data: lvalue, //[86,114,106,106,107,111,133,221,783,2478],
        radius: 1,
        label: "Limite Inferior",
        borderColor: "#3cba9f",
        fill: false,
        borderDash: [10,5]
      }]
  },
  options: {
  	plugins: {
  		title: {
  			display: true,
  			text: parametro.value
  		}
  	}
  }
});

}

geraModelo.addEventListener("click", async function (e) 
{
	const csvFile = inputFile.files[0]
	dfd.readCSV(csvFile).then((df) => {

		const jsonObj = dfd.toJSON(df);

		jsonObj.push({ Parametro: parametro.value })
		jsonObj.push({ Metrica: metrica.value })
		console.log(jsonObj)

		// fetch('/api/model', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(jsonObj),
		// })

		fetch('https://biomapp-api.vercel.app/api/model', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(jsonObj),
		})

		.then((response) => response.json())
		.then(trubisquinho)
		.catch((error) => {
			console.error('Error:', error);
		});
	})
});
