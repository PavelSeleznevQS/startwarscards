import {useQuery} from '@tanstack/react-query';
import {IPerson} from 'src/features/person/services/PersonService';

type ArgumentsType<QT, T> = {
  key: string,
  params?: QT,
  method: (arg: QT) => Promise<T>
  enabled?: boolean
}

function useSpecifiedQuery<QT extends string | string[] = string[], T = IPerson>(args: ArgumentsType<QT, T>) {
  const {key, params, method, enabled = true} = args;
  return useQuery<T, {message: string}>({
    queryKey: [key, params],
    queryFn: ({queryKey}) => method(queryKey[1] as QT),
    enabled
  });
}
export default useSpecifiedQuery;
