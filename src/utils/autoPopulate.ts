import { NextFunction } from 'express';
import { IFeedbackModel } from '../model/feedback.model';

export default (collectionName: string, fieldsRequired: string) =>
  function (this: IFeedbackModel, next: NextFunction) {
    this?.populate(collectionName, fieldsRequired);
    next();
  };
