import Email from "../models/Email.js";

export const getEmail = async (req, res, next) => {
  let mailList = [];
  try {
    // console.log(">>> req.body: ", req.body);

    for (let i = 0; i < req.body.idList.length; i++) {
      const res = await Email.findById(req.body.idList[i]);
      // console.log(">>>>EMAIL:", res);
      mailList.push(res.email);
    }

    req.body.mailList = mailList;
    next();
  } catch (error) {
    return res.status(403).send(error);
  }
};
