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
  ImageUploadStatus = 'IMAGE_UPLOAD_STATUS',
  ImageFileSource = 'IMAGE_FILE_SOURCE',
  ImageCanQuery = 'IMAGE_CAN_QUERY',
  RsvpSubmitted = 'RSVP_SUBMIT',
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

export type Submitted = boolean;

export type RsvpState = {
  submitted: Submitted;
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

export type RsvpPayload = {
  [Types.RsvpSubmitted]: {
    submitted: Submitted;
  };
};

export type SocialActions = ActionMap<SocialPayload>[keyof ActionMap<SocialPayload>];
export type RsvpActions = ActionMap<RsvpPayload>[keyof ActionMap<RsvpPayload>];

export const socialReducer = (state: SocialState, action: SocialActions): SocialState => {
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

export const rsvpReducer = (state: RsvpState, action: RsvpActions): RsvpState => {
  switch (action.type) {
  case Types.RsvpSubmitted:
    return {...state, submitted: action.payload.submitted};
  default:
    return state;
  }
};
