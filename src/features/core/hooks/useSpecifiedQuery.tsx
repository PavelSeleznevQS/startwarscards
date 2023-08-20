import {useQuery} from '@tanstack/react-query';
import {IPerson} from 'src/features/person/services/PersonService';

type ArgumentsType<T> = {
  key: string,
  params: any,
  method: (args: any) => Promise<T>
  enabled?: boolean
}

function useSpecifiedQuery<T = IPerson>(args: ArgumentsType<T>) {
  const {key, params, method, enabled = true} = args;
  return useQuery<T, {message: string}>({
    queryKey: [key, params],
    queryFn: ({queryKey}) => method(queryKey[1] as string),
    enabled
  });
}
export default useSpecifiedQuery;
