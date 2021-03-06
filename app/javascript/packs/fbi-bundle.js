import ReactOnRails from 'react-on-rails';
import AdminDocumentList from '../bundles/FbiDocument/components/AdminDocumentList'
import TurkDocumentForm from '../bundles/FbiDocument/components/TurkDocumentForm';
import TurkDocumentFormContainer from '../bundles/FbiDocument/components/TurkDocumentFormContainer';
import RedactionEditor from '../bundles/FbiDocument/components/RedactionEditor';
import Main from '../bundles/FbiDocument/components/Main';
import AdminApprovalView from '../bundles/FbiDocument/components/AdminApprovalView';
import Help from '../bundles/FbiDocument/components/Help';

ReactOnRails.register({
  TurkDocumentForm,
  TurkDocumentFormContainer,
  RedactionEditor,
  AdminDocumentList,
  Main,
  AdminApprovalView,
  Help,
});
