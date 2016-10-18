import { ITeam } from '.././ITeam';
import { ISection } from '.././ISection';
import { IDivision } from '.././IDivision';

export interface IList {
	id: String;
	name: String;
	source: String;
	parentId: String;
	teams?: Array<ITeam>;
	sections?: Array<ISection>;
	divisions?: Array<IDivision>;
}