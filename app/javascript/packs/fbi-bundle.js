import ReactOnRails from 'react-on-rails';

import Document from '../bundles/FbiDocument/components/Document'

import AdminDocumentList from '../bundles/FbiDocument/components/AdminDocumentList'
import TurkDocumentForm from '../bundles/FbiDocument/components/TurkDocumentForm';

ReactOnRails.register({
  Document,
  TurkDocumentForm,
  AdminDocumentList,
});
