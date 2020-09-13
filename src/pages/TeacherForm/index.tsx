import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PagesHeader';
import IconWarning from '../../assets/icons/warning.svg';
import './styles.css';
import { useHistory } from 'react-router-dom'
import Input from '../../components/Inputs';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';
function TeacherForm(){

    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');


    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '08:00', to: '4:00'},
    ]
);

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
    }

    function setScheduleItemsValue(position: number, field: string, value: string){
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index == position){
                return {...scheduleItem, [field]: value}
            }
            return scheduleItem;
        });
        setScheduleItems(updateScheduleItems);
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!')
            history.push('/')
        }).catch(() =>{
            alert('erro no cadastro');
        })
    }
    return(
        <div id="page-teacher-form" className="container">
        <PageHeader title="Que bom que você quer dar aulas"
        description="O primeiro passo é fazer o cadastro"
        />

        <main>
            <form onSubmit={handleCreateClass}>
            <fieldset>
                <legend>Seu Dados</legend>

                <Input
                name="name"
                 label="Nome Completo"
                  value={name}
                   onChange={(e) => {setName(e.target.value)}} />

                <Input
                 name="avatar"
                  label="Avatar"
                   value={avatar}
                    onChange={(e) => {setAvatar(e.target.value)}} />


                <Input
                name="whatsapp"
                    label="WhatsApp"
                      value={whatsapp}
                        onChange={(e) => {setWhatsapp(e.target.value)}} />


                <Textarea
                name="bio"
                 label="Biografia"
                   value={bio}
                     onChange={(e) => {setBio(e.target.value)}}/>

            </fieldset>
            <br />
            <fieldset>
                <legend>Sobre a Aula</legend>

                <Select
                name="subject"
                label="Matéria"
                value={subject}
                onChange={(e) => {setSubject(e.target.value)}}
                options={[
                    { value: 'Artes', label: 'Artes'},
                    { value: 'Biologia', label: 'Biologia'},
                    { value: 'Matemática', label: 'Matemática'},
                    { value: 'Geografia', label: 'Geografia'},
                    { value: 'Ed Física', label: 'Ed Física'},
                ]}
                />
                <Input 
                name="cost"
                 label="Custo da Aula"
                  value={cost}
                   onChange={(e) => {setCost(e.target.value)}}/>

            </fieldset>

            <fieldset>
                <legend>Horários disponíveis
                <button type="button" onClick={addNewScheduleItem}>
                    + Novo Horário
                </button>
                </legend>
                {scheduleItems.map((scheduleItem, index) =>{
                    return(
                        <div key={scheduleItem.week_day} className="schedule-item">
                        <Select
                        name="week_day"
                        label="Dia da semana"
                        value={scheduleItem.week_day}
                        onChange={e => setScheduleItemsValue(index, 'week_day', e.target.value)}
                        options={[
                            { value: '0', label: 'Domingo'},
                            { value: '1', label: 'Segunda'},
                            { value: '2', label: 'Terça'},
                            { value: '3', label: 'Quarta'},
                            { value: '4', label: 'Quinta'},
                            { value: '5', label: 'Sexta'},
                            { value: '6', label: 'Sábado'},
                        ]}
                        />
                        <Input
                        name="from"
                         label="Das"
                          type="time"
                          value={scheduleItem.from}
                          onChange={e => setScheduleItemsValue(index, 'from', e.target.value)}
                          />

                        <Input
                        name="to"
                         label="Até"
                          type="time"
                          value={scheduleItem.to}
                          onChange={e => setScheduleItemsValue(index, 'to', e.target.value)}
                          />
                        </div>
                    );
                })}
            </fieldset>

            <footer>
                <p>
                <img src={IconWarning} alt="Aviso importante"/>
                Impotante! <br />
                Preencha todos os campos
                </p>
                <button type="submit">
                    Salvar o cadastro
                </button>
            </footer>
            </form>
        </main>
    </div>
    )
}

export default TeacherForm;