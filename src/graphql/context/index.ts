import type { ExpressContextFunctionArgument } from "@as-integrations/express5";
import { verifyJwt } from "../../utils/jwt";
import type { JwtPayload } from "jsonwebtoken";

export type GraphqlContext = {
  user: string | undefined;
  token: string | undefined;
  req: ExpressContextFunctionArgument["req"];
  res: ExpressContextFunctionArgument["res"];
};

export const buildContext = async ({
  req,
  res,
}: ExpressContextFunctionArgument): Promise<GraphqlContext> => {
  const authHeader = req.headers.authorization;
  let user: string | undefined;
  let token: string | undefined;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring("Bearer ".length);

    try {
      const payload = verifyJwt(token) as JwtPayload;
      user = payload.id as string;
    } catch (error) {
      user = undefined;
    }
  }

  return { user, token, res, req };
};
