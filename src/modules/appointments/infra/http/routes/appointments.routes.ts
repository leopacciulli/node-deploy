import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/my/:user_id', appointmentsController.show);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get('/me', providerAppointmentsController.index);
appointmentsRouter.delete('/:appointment_id', appointmentsController.delete);

export default appointmentsRouter;

/**
 * ANOTATIONS:
 *
 * SoC: Separation Of Concerns (separação de preocupações)
 *
 * DTO: Data Transfer Object
 *
 * S: Single Responsability Principle: Cada classe com sua única responsabilidade
 * O: Open Closed Principle:
 * L: Liskov Substitution Principle: Definir conjunto de regras para camadas que se integram com libs
 * I: Interface Segregation Principle:
 * D: Dependency Invertion: recebe a classe repository como parâmetro no constructor do service
 */
