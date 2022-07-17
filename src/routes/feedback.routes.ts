import Express, { Request, Response } from "express";

const feedbackRoutes = Express.Router();
feedbackRoutes.get("/", (req: Request, res: Response) => res.sendStatus(200));

export default feedbackRoutes;
