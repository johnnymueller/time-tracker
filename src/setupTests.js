import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.3';

configure({ adapter: new Adapter() });

export default {
  moduleNameMapper: {
    "^lib/(.*)$": "<rootDir>/lib/$1",
    "^domains/(.*)$": "<rootDir>/domains/$1",
  }
}