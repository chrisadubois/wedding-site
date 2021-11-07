type ActionMap<M extends {[index: string]: any}> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Add = 'ADD',
  ImageUploadStatus = 'IMAGE_UPLOAD_STATUS',
  ImageFileSource = 'IMAGE_FILE_SOURCE',
  ImageCanQuery = 'IMAGE_CAN_QUERY',
}

export enum Status {
  Success = 'SUCCESS',
  Failure = 'FAILURE',
  Pending = 'PENDING',
}

export type ImageFileSource = {
  src: string | null;
  file: File | null;
};

export type SocialState = {
  imageUploadStatus: Status | null;
  imageCanQuery: boolean;
  imageFileSrc: ImageFileSource;
};

export type SocialPayload = {
  [Types.ImageFileSource]: {
    imgFileSrc: ImageFileSource;
  };
  [Types.ImageUploadStatus]: {
    status: Status | null;
  };
  [Types.ImageCanQuery]: {
    canQuery: boolean;
  };
};

export type SocialActions = ActionMap<SocialPayload>[keyof ActionMap<SocialPayload>];

export const socialReducer = (state: SocialState, action: SocialActions | BaseActions): SocialState => {
  switch (action.type) {
  case Types.ImageFileSource:
    return {...state, imageFileSrc: {src: action.payload.imgFileSrc.src, file: action.payload.imgFileSrc.file}};
  case Types.ImageUploadStatus:
    return {...state, imageUploadStatus: action.payload.status};
  case Types.ImageCanQuery:
    return {...state, imageCanQuery: action.payload.canQuery};
  default:
    return state;
  }
};

export type BasePayload = {
  [Types.Add]: undefined;
};

export type BaseActions = ActionMap<BasePayload>[keyof ActionMap<BasePayload>];

export const baseReducer = (state: number, action: SocialActions | BaseActions): number => {
  switch (action.type) {
  case Types.Add:
    return state + 1;
  default:
    return state;
  }
};
