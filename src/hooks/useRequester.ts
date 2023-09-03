import { useCallback, useState } from 'react';

type Props<T> = {
  onSubmit: (data: any) => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
};

type Requester = {
  submit: (data: any) => Promise<void>;
  loading: boolean;
  failed: boolean;
};

function useRequester<T>(props: Props<T>): Requester {
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const { onSubmit, onSuccess, onError } = props;

  const submit = useCallback(
    async (data: any): Promise<void> => {
      setLoading(true);
      setFailed(false);

      try {
        const res: T = await onSubmit(data);
        onSuccess && onSuccess(res);
      } catch (error) {
        setFailed(true);
        onError && onError(error);
      }

      setLoading(false);
    },
    [onSubmit, onSuccess, onError]
  );

  return {
    submit,
    loading,
    failed,
  };
}

export default useRequester;
