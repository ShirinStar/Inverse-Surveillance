import ReactOnRails from 'react-on-rails';

import Document from '../bundles/FbiDocument/components/Document'

import AdminDocumentList from '../bundles/FbiDocument/components/AdminDocumentList'
import TurkDocumentForm from '../bundles/FbiDocument/components/TurkDocumentForm';
import RedactionEditor from '../bundles/FbiDocument/components/RedactionEditor';

ReactOnRails.register({
  Document,
  TurkDocumentForm,
  RedactionEditor,
  AdminDocumentList,
});
