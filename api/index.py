from flask import Flask, request, json, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd
import numpy as np
from sklearn.metrics import r2_score, mean_squared_error

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def home():
    return 'Hello, My World!'

@app.route('/about')
def about():
    return 'About-sobre'

def calcula_coeficientes_DFT(x):
    X = np.fft.fft(x/len(x), 288)
    A0 = np.mean(x)
    A1 = 2*np.abs(X[12])
    F1 = np.angle(X[12])
    A2 = 2*np.abs(X[24])
    F2 = np.angle(X[24])
    A3 = 2*np.abs(X[36])
    F3 = np.angle(X[36])
    return([A0,A1,F1,A2,F2,A3,F3])

def calcula_coeficientes_mq(x):
    X = np.fft.fft(x/len(x), 288)
    A0 = np.mean(x)
    A1 = 2*np.abs(X[12])
    F1 = np.angle(X[12])
    A2 = 2*np.abs(X[24])
    F2 = np.angle(X[24])
    A3 = 2*np.abs(X[36])
    F3 = np.angle(X[36])
    return([A0,A1,F1,A2,F2,A3,F3])


@app.route('/api/model', methods=['GET', 'POST'])
@cross_origin() # Headers de cors na rota
def model():
    data = json.loads(request.data)

    num_pontos = len(data) - 2
    print(num_pontos)

    print(data[num_pontos]['Parametro'])

    print(data[num_pontos+1]['Metrica'])

    vhora_do_dia = np.array([])
    parametro = np.array([])

    str_parametro = data[num_pontos]['Parametro']
    str_metrica = data[num_pontos+1]['Metrica']
    #str_parametro = 'Vazao do esgoto'

    # tem um bug aqui - se ele nao conseguir converter pra float vai quebrar
    for i in range(0,num_pontos):
        vhora_do_dia = np.append(vhora_do_dia, float(data[i]['Hora']))
        parametro = np.append(parametro, float(data[i][str_parametro]))

    media = []
    mediana = []
    desvio_padrao = []
    quartil1 = []
    quartil3 = []
    geral = []
    lmax = []
    lmin = []

    h00 = []
    h01 = []
    h02 = []
    h03 = []
    h04 = []
    h05 = []

    h06 = []
    h07 = []
    h08 = []
    h09 = []
    h10 = []
    h11 = []

    h12 = []
    h13 = []
    h14 = []
    h15 = []
    h16 = []
    h17 = []

    h18 = []
    h19 = []
    h20 = []
    h21 = []
    h22 = []
    h23 = []

    casas_decimais = 2

    for hora_do_dia in range(0,24):
        h = []
        for i in range(0,len(parametro)):
            if (vhora_do_dia[i] == hora_do_dia):
                if(np.isnan(parametro[i]) == False):
                    h.append(parametro[i])

            if ((vhora_do_dia[i] == 0) and (hora_do_dia == 0)):
                if(np.isnan(parametro[i]) == False):
                    h00.append(parametro[i])
            if ((vhora_do_dia[i] == 1) and (hora_do_dia == 1)):
                if(np.isnan(parametro[i]) == False):
                    h01.append(parametro[i])
            if ((vhora_do_dia[i] == 2) and (hora_do_dia == 2)):
                if(np.isnan(parametro[i]) == False):
                    h02.append(parametro[i])
            if ((vhora_do_dia[i] == 3) and (hora_do_dia == 3)):
                if(np.isnan(parametro[i]) == False):
                    h03.append(parametro[i])
            if ((vhora_do_dia[i] == 4) and (hora_do_dia == 4)):
                if(np.isnan(parametro[i]) == False):
                    h04.append(parametro[i])
            if ((vhora_do_dia[i] == 5) and (hora_do_dia == 5)):
                if(np.isnan(parametro[i]) == False):
                    h05.append(parametro[i])

            if ((vhora_do_dia[i] == 6) and (hora_do_dia == 6)):
                if(np.isnan(parametro[i]) == False):
                    h06.append(parametro[i])
            if ((vhora_do_dia[i] == 7) and (hora_do_dia == 7)):
                if(np.isnan(parametro[i]) == False):
                    h07.append(parametro[i])
            if ((vhora_do_dia[i] == 8) and (hora_do_dia == 8)):
                if(np.isnan(parametro[i]) == False):
                    h08.append(parametro[i])
            if ((vhora_do_dia[i] == 9) and (hora_do_dia == 9)):
                if(np.isnan(parametro[i]) == False):
                    h09.append(parametro[i])
            if ((vhora_do_dia[i] == 10) and (hora_do_dia == 10)):
                if(np.isnan(parametro[i]) == False):
                    h10.append(parametro[i])
            if ((vhora_do_dia[i] == 11) and (hora_do_dia == 11)):
                if(np.isnan(parametro[i]) == False):
                    h11.append(parametro[i])

            if ((vhora_do_dia[i] == 12) and (hora_do_dia == 12)):
                if(np.isnan(parametro[i]) == False):
                    h12.append(parametro[i])
            if ((vhora_do_dia[i] == 13) and (hora_do_dia == 13)):
                if(np.isnan(parametro[i]) == False):
                    h13.append(parametro[i])
            if ((vhora_do_dia[i] == 14) and (hora_do_dia == 14)):
                if(np.isnan(parametro[i]) == False):
                    h14.append(parametro[i])
            if ((vhora_do_dia[i] == 15) and (hora_do_dia == 15)):
                if(np.isnan(parametro[i]) == False):
                    h15.append(parametro[i])
            if ((vhora_do_dia[i] == 16) and (hora_do_dia == 16)):
                if(np.isnan(parametro[i]) == False):
                    h16.append(parametro[i])
            if ((vhora_do_dia[i] == 17) and (hora_do_dia == 17)):
                if(np.isnan(parametro[i]) == False):
                    h17.append(parametro[i])

            if ((vhora_do_dia[i] == 18) and (hora_do_dia == 18)):
                if(np.isnan(parametro[i]) == False):
                    h18.append(parametro[i])
            if ((vhora_do_dia[i] == 19) and (hora_do_dia == 19)):
                if(np.isnan(parametro[i]) == False):
                    h19.append(parametro[i])
            if ((vhora_do_dia[i] == 20) and (hora_do_dia == 20)):
                if(np.isnan(parametro[i]) == False):
                    h20.append(parametro[i])
            if ((vhora_do_dia[i] == 21) and (hora_do_dia == 21)):
                if(np.isnan(parametro[i]) == False):
                    h21.append(parametro[i])
            if ((vhora_do_dia[i] == 22) and (hora_do_dia == 22)):
                if(np.isnan(parametro[i]) == False):
                    h22.append(parametro[i])
            if ((vhora_do_dia[i] == 23) and (hora_do_dia == 23)):
                if(np.isnan(parametro[i]) == False):
                    h23.append(parametro[i])

        geral.append(h)

        #desvio_padrao.append(round(np.std(h),casas_decimais))
        #media.append(round(np.mean(h),casas_decimais))
        #mediana.append(round(np.median(h),casas_decimais))
        desvio_padrao.append(np.std(h))
        media.append(np.mean(h))
        mediana.append(np.median(h))

        q1 = np.quantile(h, 0.25)
        #quartil1.append(round(q1,casas_decimais))
        quartil1.append(q1)

        q2 = np.quantile(h, 0.50)
        q3 = np.quantile(h, 0.75)
        #quartil3.append(round(q3,casas_decimais))
        quartil3.append(q3)

        iiq = q3 - q1
        lmax.append(q3 + 1.5*iiq)
        lmin.append(q1 - 1.5*iiq)

    media = np.array(media)
    mediana = np.array(mediana)
    desvio_padrao = np.array(desvio_padrao)
    quartil1 = np.array(quartil1)
    quartil3 = np.array(quartil3)
    lmax = np.array(lmax)
    lmin = np.array(lmin)

    print(media)
    print(mediana)
    print(desvio_padrao)
    print(quartil1)
    print(quartil3)


    model = []
    metrica = []
    casas_decimais = 3

    if(str_metrica == 'Mediana'):
        metrica = mediana
        print('metrica = mediana')

    if(str_metrica == 'Média'):
        metrica = media
        print('metrica = media')

    if(len(metrica) == 24):
        coefs = calcula_coeficientes_DFT(metrica)
    else:
        coefs = calcula_coeficientes_mq(metrica)

    lista = []
    for i in range(0,5):
        #lista.append(round(coefs[i], casas_decimais))
        lista.append(coefs[i])

    # calcula o R2
    n = np.arange(0,1,1/24)
    print(n)
    yhat1 = coefs[0] + coefs[1]*np.cos(2*np.pi*n + coefs[2]) + coefs[3]*np.cos(4*np.pi*n + coefs[4])

    print(yhat1)
    print(metrica)

    r2 = r2_score(metrica, yhat1)
    print('R2: ', r2)

    model.append({'model': lista})
    print(lista)

    if(len(lmax) == 24):
        coefs = calcula_coeficientes_DFT(lmax)
    else:
        coefs = calcula_coeficientes_mq(lmax)

    lista = []
    for i in range(0,5):
        #lista.append(round(coefs[i], casas_decimais))
        lista.append(coefs[i])

    model.append({'ul_model': lista})
    print(lista)

    if(len(lmin) == 24):
        coefs = calcula_coeficientes_DFT(lmin)
    else:
        coefs = calcula_coeficientes_mq(lmin)

    lista = []
    for i in range(0,5):
        #lista.append(round(coefs[i], casas_decimais))
        lista.append(coefs[i])

    model.append({'ll_model': lista})
    print(lista)

    # adiciona as estatisticas descritivas no json de retorno
    model.append({'media': list(media)})
    model.append({'mediana': list(mediana)})
    model.append({'desvio_padrao': list(desvio_padrao)})
    model.append({'quartil1': list(quartil1)})
    model.append({'quartil3': list(quartil3)})

    model.append({'h00': list(h00)})
    model.append({'h01': list(h01)})
    model.append({'h02': list(h02)})
    model.append({'h03': list(h03)})
    model.append({'h04': list(h04)})
    model.append({'h05': list(h05)})

    model.append({'h06': list(h06)})
    model.append({'h07': list(h07)})
    model.append({'h08': list(h08)})
    model.append({'h09': list(h09)})
    model.append({'h10': list(h10)})
    model.append({'h11': list(h11)})

    model.append({'h12': list(h12)})
    model.append({'h13': list(h13)})
    model.append({'h14': list(h14)})
    model.append({'h15': list(h15)})
    model.append({'h16': list(h16)})
    model.append({'h17': list(h17)})

    model.append({'h18': list(h18)})
    model.append({'h19': list(h19)})
    model.append({'h20': list(h20)})
    model.append({'h21': list(h21)})
    model.append({'h22': list(h22)})
    model.append({'h23': list(h23)})

    #model.append({'R2': round(r2, 6)})
    model.append({'R2': r2})

    return jsonify(model)
