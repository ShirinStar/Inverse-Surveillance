import ReactOnRails from 'react-on-rails';
import AdminDocumentList from '../bundles/FbiDocument/components/AdminDocumentList'
import TurkDocumentForm from '../bundles/FbiDocument/components/TurkDocumentForm';
import RedactionEditor from '../bundles/FbiDocument/components/RedactionEditor';
import Main from '../bundles/FbiDocument/components/Main';

ReactOnRails.register({
  TurkDocumentForm,
  RedactionEditor,
  AdminDocumentList,
  Main,
});
