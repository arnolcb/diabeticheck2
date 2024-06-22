import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req) {
  let { messages } = await req.json();
  const diabetesQnA = [
    {
      role: 'user',
      content: '¿Qué es la diabetes?',
    },
    {
      role: 'system',
      content: 'La diabetes es una enfermedad que ocurre cuando el organismo es incapaz de generar insulina o utilizarla correctamente. El páncreas produce la insulina para regular el uso de la glucosa (azúcar) en el organismo.',
    },
    {
      role: 'user',
      content: '¿Existen factores de riesgo de diabetes?',
    },
    {
      role: 'system',
      content: 'Sí. Algunos factores de riesgo son: antecedentes familiares de diabetes, sobrepeso y obesidad, enfermedad cardiovascular, dislipidemia, quistes en los ovarios, haber tenido bebés con peso mayor a 4 kilos, uso de esteroides o tratamiento de esquizofrenia.',
    },
    {
      role: 'user',
      content: '¿Cuáles son los síntomas de la diabetes?',
    },
    {
      role: 'system',
      content: 'Algunos síntomas incluyen aumento de sed, orinar más de lo habitual, cansancio y pérdida de peso, heridas que tardan en cerrar, comezón en genitales, visión borrosa, náuseas o vómito, deseos de comer en grandes cantidades, y coloración negruzca en cuello o codos.',
    },
    {
      role: 'user',
      content: '¿Cuántos tipos de diabetes hay?',
    },
    {
      role: 'system',
      content: 'Existen 3 tipos de diabetes: Tipo I, Tipo II y Diabetes Gestacional (durante el embarazo).',
    },
    {
      role: 'user',
      content: '¿Cómo se controla la diabetes?',
    },
    {
      role: 'system',
      content: 'Se controla con medicamentos hipoglucemiantes, dieta adecuada y ejercicio regular, bajo la supervisión de un médico.',
    },
    {
      role: 'user',
      content: '¿La diabetes se cura?',
    },
    {
      role: 'system',
      content: 'Lamentablemente no es curable, pero se puede controlar con éxito siguiendo el tratamiento recomendado por un médico.',
    },
    {
      role: 'user',
      content: '¿Qué tipo de dieta tengo que hacer si padezco diabetes?',
    },
    {
      role: 'system',
      content: 'Debes seguir una dieta que mantenga niveles adecuados de azúcar en sangre, evitando alimentos con alto contenido de azúcar, comiendo porciones pequeñas a lo largo del día, y eligiendo alimentos integrales, frutas y vegetales. Limita el consumo de grasas, alcohol y sal.',
    },
    {
      role: 'user',
      content: '¿Qué otros cuidados debo tener si tengo diabetes?',
    },
    {
      role: 'system',
      content: 'Debes cuidar especialmente tus pies, usar calzado cómodo, mantener la piel lubricada, hacer ejercicio regularmente (como correr, nadar, gimnasia) supervisado por tu médico, y evitar el tabaco y el consumo excesivo de alcohol.',
    },
    {
      role: 'user',
      content: '¿Cómo puedo prevenir la diabetes?',
    },
    {
      role: 'system',
      content: 'La diabetes se puede prevenir con una dieta adecuada, actividad física regular, manteniendo un peso saludable, evitando el tabaco y moderando el consumo de alcohol.',
    },
    {
      role: 'user',
      content: '¿Cuáles son las complicaciones de la diabetes?',
    },
    {
      role: 'system',
      content: 'Con el tiempo, la diabetes puede causar problemas en órganos como riñones, pies, ojos, y aumentar el riesgo de enfermedades cardíacas, trastornos óseos y articulares, problemas en la piel, digestión, disfunción sexual, y emergencias médicas por niveles de azúcar extremadamente altos o bajos.',
    },
    {
      role: 'user',
      content: 'Si tengo náuseas, cansancio o temblores, ¿qué debo hacer?',
    },
    {
      role: 'system',
      content: 'Busca atención médica inmediata, ya que podrían ser síntomas de complicaciones graves relacionadas con la diabetes.',
    },
  ];
  messages = [
    {
      role: 'system',
      content: '¡Hola! Soy DiabetiCheck, tu asistente para responder preguntas sobre la diabetes.',
    },
    ...diabetesQnA,
    ...messages,
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
